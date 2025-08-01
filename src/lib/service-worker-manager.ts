// 🔧 Service Worker Manager for Registration and Communication
'use client'

interface ServiceWorkerStatus {
  registered: boolean
  active: boolean
  waiting: boolean
  installing: boolean
  error?: string
  lastUpdate?: number
}

interface CacheStatus {
  caches: string[]
  totalCaches: number
  totalEntries: number
  timestamp: number
  [cacheName: string]: any
}

interface ServiceWorkerConfig {
  scope: string
  updateViaCache: 'imports' | 'all' | 'none'
  autoUpdate: boolean
  updateInterval: number // minutes
  enableNotifications: boolean
}

export class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null
  private status: ServiceWorkerStatus = {
    registered: false,
    active: false,
    waiting: false,
    installing: false
  }
  private config: ServiceWorkerConfig
  private updateCheckInterval: NodeJS.Timeout | null = null
  private listeners: Map<string, Function[]> = new Map()

  constructor(config?: Partial<ServiceWorkerConfig>) {
    this.config = {
      scope: '/',
      updateViaCache: 'none',
      autoUpdate: true,
      updateInterval: 60, // 1 hour
      enableNotifications: true,
      ...config
    }

    // Initialize listeners
    this.listeners.set('statusChange', [])
    this.listeners.set('updateAvailable', [])
    this.listeners.set('cacheUpdate', [])
    this.listeners.set('offline', [])
    this.listeners.set('online', [])
  }

  // 🚀 Register service worker
  async register(): Promise<boolean> {
    try {
      if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker not supported')
        return false
      }

      console.log('Service Worker: Registering...')
      
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: this.config.scope,
        updateViaCache: this.config.updateViaCache
      })

      console.log('Service Worker: Registered successfully')
      
      // Set up event listeners
      this.setupEventListeners()
      
      // Update status
      this.updateStatus()
      
      // Start auto-update if enabled
      if (this.config.autoUpdate) {
        this.startAutoUpdate()
      }

      // Listen for network status changes
      this.setupNetworkListeners()

      return true

    } catch (error) {
      console.error('Service Worker: Registration failed:', error)
      this.status.error = error instanceof Error ? error.message : 'Registration failed'
      this.emit('statusChange', this.status)
      return false
    }
  }

  // 🔄 Update service worker
  async update(): Promise<boolean> {
    try {
      if (!this.registration) {
        console.warn('Service Worker: No registration found')
        return false
      }

      console.log('Service Worker: Checking for updates...')
      await this.registration.update()
      
      this.updateStatus()
      return true

    } catch (error) {
      console.error('Service Worker: Update failed:', error)
      return false
    }
  }

  // ⏭️ Skip waiting and activate new service worker
  async skipWaiting(): Promise<void> {
    try {
      if (!this.registration?.waiting) {
        console.warn('Service Worker: No waiting worker found')
        return
      }

      // Send skip waiting message
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      
      // Wait for activation
      await new Promise<void>((resolve) => {
        const handleStateChange = () => {
          if (this.registration?.active) {
            resolve()
          }
        }

        if (this.registration?.waiting) {
          this.registration.waiting.addEventListener('statechange', handleStateChange)
        }
      })

      // Reload page to use new service worker
      window.location.reload()

    } catch (error) {
      console.error('Service Worker: Skip waiting failed:', error)
    }
  }

  // 🗑️ Unregister service worker
  async unregister(): Promise<boolean> {
    try {
      if (!this.registration) {
        return true
      }

      const unregistered = await this.registration.unregister()
      
      if (unregistered) {
        this.registration = null
        this.status = {
          registered: false,
          active: false,
          waiting: false,
          installing: false
        }
        
        this.stopAutoUpdate()
        this.emit('statusChange', this.status)
        
        console.log('Service Worker: Unregistered successfully')
      }

      return unregistered

    } catch (error) {
      console.error('Service Worker: Unregistration failed:', error)
      return false
    }
  }

  // 📊 Get service worker status
  getStatus(): ServiceWorkerStatus {
    return { ...this.status }
  }

  // 💾 Cache management methods
  async cacheUrls(urls: string[]): Promise<void> {
    try {
      if (!this.registration?.active) {
        console.warn('Service Worker: No active worker found')
        return
      }

      this.registration.active.postMessage({
        type: 'CACHE_URLS',
        payload: { urls }
      })

      console.log('Service Worker: Caching URLs:', urls)
      this.emit('cacheUpdate', { action: 'cache', urls })

    } catch (error) {
      console.error('Service Worker: Cache URLs failed:', error)
    }
  }

  async clearCache(cacheName?: string): Promise<void> {
    try {
      if (!this.registration?.active) {
        console.warn('Service Worker: No active worker found')
        return
      }

      this.registration.active.postMessage({
        type: 'CLEAR_CACHE',
        payload: { cacheName }
      })

      console.log('Service Worker: Clearing cache:', cacheName || 'all')
      this.emit('cacheUpdate', { action: 'clear', cacheName })

    } catch (error) {
      console.error('Service Worker: Clear cache failed:', error)
    }
  }

  async getCacheStatus(): Promise<CacheStatus | null> {
    try {
      if (!this.registration?.active) {
        console.warn('Service Worker: No active worker found')
        return null
      }

      return new Promise((resolve) => {
        const messageChannel = new MessageChannel()
        
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data)
        }

        this.registration!.active!.postMessage(
          { type: 'GET_CACHE_STATUS' },
          [messageChannel.port2]
        )
      })

    } catch (error) {
      console.error('Service Worker: Get cache status failed:', error)
      return null
    }
  }

  // 🔔 Event listener management
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  off(event: string, callback: Function): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data?: any): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  // 🔧 Private helper methods
  private setupEventListeners(): void {
    if (!this.registration) return

    // Listen for service worker state changes
    this.registration.addEventListener('updatefound', () => {
      console.log('Service Worker: Update found')
      
      const newWorker = this.registration!.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          this.updateStatus()
          
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('Service Worker: New version available')
            this.emit('updateAvailable', {
              hasUpdate: true,
              canSkipWaiting: true
            })
            
            if (this.config.enableNotifications) {
              this.showUpdateNotification()
            }
          }
        })
      }
    })

    // Listen for controller changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker: Controller changed')
      this.updateStatus()
    })

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event)
    })
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      console.log('Network: Online')
      this.emit('online', { online: true })
    })

    window.addEventListener('offline', () => {
      console.log('Network: Offline')
      this.emit('offline', { online: false })
    })
  }

  private updateStatus(): void {
    if (!this.registration) return

    this.status = {
      registered: true,
      active: !!this.registration.active,
      waiting: !!this.registration.waiting,
      installing: !!this.registration.installing,
      lastUpdate: Date.now()
    }

    this.emit('statusChange', this.status)
  }

  private startAutoUpdate(): void {
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval)
    }

    this.updateCheckInterval = setInterval(() => {
      this.update()
    }, this.config.updateInterval * 60 * 1000) // Convert minutes to milliseconds
  }

  private stopAutoUpdate(): void {
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval)
      this.updateCheckInterval = null
    }
  }

  private handleServiceWorkerMessage(event: MessageEvent): void {
    const { type, payload } = event.data

    switch (type) {
      case 'CACHE_UPDATED':
        this.emit('cacheUpdate', payload)
        break
      case 'OFFLINE_READY':
        console.log('Service Worker: Offline functionality ready')
        break
      default:
        console.log('Service Worker: Unknown message:', type, payload)
    }
  }

  private showUpdateNotification(): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('App Update Available', {
        body: 'A new version of the app is available. Click to update.',
        icon: '/favicon.ico',
        tag: 'app-update'
      })
    }
  }

  // 🎯 Utility methods for common operations
  async preloadCriticalResources(): Promise<void> {
    const criticalUrls = [
      '/dashboard',
      '/api/user-profile',
      '/api/learning-content',
      '/_next/static/css/app.css',
      '/_next/static/js/app.js'
    ]

    await this.cacheUrls(criticalUrls)
  }

  async warmupCache(userPreferences: {
    routes: string[]
    features: string[]
  }): Promise<void> {
    const { routes, features } = userPreferences
    const urlsToCache = []

    // Add preferred routes
    urlsToCache.push(...routes)

    // Add feature-specific resources
    if (features.includes('ai-tools')) {
      urlsToCache.push('/api/content/generate', '/api/ai-analytics')
    }

    if (features.includes('collaboration')) {
      urlsToCache.push('/api/collaboration', '/collaborate')
    }

    if (features.includes('code-review')) {
      urlsToCache.push('/api/code-review', '/code-review')
    }

    await this.cacheUrls(urlsToCache)
  }

  // 📱 Check if app is running in standalone mode (PWA)
  isStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true
  }

  // 🌐 Check network status
  isOnline(): boolean {
    return navigator.onLine
  }

  // 💾 Get storage usage estimate
  async getStorageEstimate(): Promise<StorageEstimate | null> {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        return await navigator.storage.estimate()
      }
      return null
    } catch (error) {
      console.error('Storage estimate failed:', error)
      return null
    }
  }
}

// Export singleton instance
export const serviceWorkerManager = new ServiceWorkerManager()

// 🚀 Auto-register service worker in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  serviceWorkerManager.register().then((registered) => {
    if (registered) {
      console.log('Service Worker: Auto-registered successfully')
      
      // Preload critical resources
      serviceWorkerManager.preloadCriticalResources()
    }
  })
}
