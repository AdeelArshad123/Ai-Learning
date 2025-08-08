// 🚀 Smart Service Worker for Offline Functionality and Caching
const CACHE_NAME = 'saas-learning-platform-v1'
const STATIC_CACHE = 'static-cache-v1'
const DYNAMIC_CACHE = 'dynamic-cache-v1'
const API_CACHE = 'api-cache-v1'

// 📦 Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  // Critical CSS and JS will be added dynamically
]

// 🎯 API endpoints to cache
const CACHEABLE_APIS = [
  '/api/user-profile',
  '/api/learning-content',
  '/api/analytics',
  '/api/content/generate',
  '/api/microlearning',
  '/api/user-journey'
]

// ⏰ Cache strategies with TTL
const CACHE_STRATEGIES = {
  static: {
    strategy: 'cache-first',
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  api: {
    strategy: 'network-first',
    ttl: 5 * 60 * 1000, // 5 minutes
  },
  images: {
    strategy: 'cache-first',
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
  dynamic: {
    strategy: 'stale-while-revalidate',
    ttl: 24 * 60 * 60 * 1000, // 24 hours
  }
}

// 🔧 Install event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

// 🔄 Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      
      // Take control of all clients
      self.clients.claim()
    ])
  )
})

// 🌐 Fetch event - Implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // 🎯 Route requests to appropriate cache strategies
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request))
  } else if (isAPIRequest(url)) {
    event.respondWith(handleAPIRequest(request))
  } else if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request))
  } else {
    event.respondWith(handleDynamicRequest(request))
  }
})

// 📱 Handle static assets (CSS, JS, fonts)
async function handleStaticAsset(request) {
  try {
    // Cache-first strategy
    const cachedResponse = await caches.match(request)
    if (cachedResponse && !isExpired(cachedResponse, CACHE_STRATEGIES.static.ttl)) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      // Add timestamp header for TTL tracking
      const responseToCache = networkResponse.clone()
      responseToCache.headers.set('sw-cached-at', Date.now().toString())
      cache.put(request, responseToCache)
    }

    return networkResponse
  } catch (error) {
    console.log('Service Worker: Static asset fetch failed:', error)
    return caches.match(request) || caches.match('/offline')
  }
}

// 🔌 Handle API requests
async function handleAPIRequest(request) {
  try {
    const url = new URL(request.url)
    
    // Network-first strategy for API requests
    try {
      const networkResponse = await fetch(request)
      if (networkResponse.ok) {
        // Cache successful API responses
        const cache = await caches.open(API_CACHE)
        const responseToCache = networkResponse.clone()
        responseToCache.headers.set('sw-cached-at', Date.now().toString())
        cache.put(request, responseToCache)
      }
      return networkResponse
    } catch (networkError) {
      // Fallback to cache if network fails
      console.log('Service Worker: Network failed, trying cache:', networkError)
      const cachedResponse = await caches.match(request)
      
      if (cachedResponse && !isExpired(cachedResponse, CACHE_STRATEGIES.api.ttl)) {
        // Add offline indicator header
        const response = cachedResponse.clone()
        response.headers.set('x-served-by', 'service-worker-cache')
        return response
      }
      
      // Return offline response for critical APIs
      if (isCriticalAPI(url.pathname)) {
        return new Response(JSON.stringify({
          error: 'Offline',
          message: 'This feature is not available offline',
          cached: false
        }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        })
      }
      
      throw networkError
    }
  } catch (error) {
    console.log('Service Worker: API request failed:', error)
    return new Response(JSON.stringify({
      error: 'Service Unavailable',
      message: 'Unable to fetch data'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// 🖼️ Handle image requests
async function handleImageRequest(request) {
  try {
    // Cache-first strategy for images
    const cachedResponse = await caches.match(request)
    if (cachedResponse && !isExpired(cachedResponse, CACHE_STRATEGIES.images.ttl)) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      const responseToCache = networkResponse.clone()
      responseToCache.headers.set('sw-cached-at', Date.now().toString())
      cache.put(request, responseToCache)
    }

    return networkResponse
  } catch (error) {
    console.log('Service Worker: Image fetch failed:', error)
    // Return placeholder image or cached version
    return caches.match(request) || 
           caches.match('/images/placeholder.png') ||
           new Response('', { status: 404 })
  }
}

// 🔄 Handle dynamic requests (pages, etc.)
async function handleDynamicRequest(request) {
  try {
    // Stale-while-revalidate strategy
    const cachedResponse = await caches.match(request)
    
    // Serve from cache immediately if available
    if (cachedResponse) {
      // Revalidate in background if stale
      if (isExpired(cachedResponse, CACHE_STRATEGIES.dynamic.ttl)) {
        event.waitUntil(updateCache(request))
      }
      return cachedResponse
    }

    // No cache, fetch from network
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      const responseToCache = networkResponse.clone()
      responseToCache.headers.set('sw-cached-at', Date.now().toString())
      cache.put(request, responseToCache)
    }

    return networkResponse
  } catch (error) {
    console.log('Service Worker: Dynamic request failed:', error)
    // Return cached version or offline page
    return caches.match(request) || 
           caches.match('/offline') ||
           new Response('Offline', { status: 503 })
  }
}

// 🔍 Helper functions
function isStaticAsset(url) {
  return url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/) ||
         url.pathname.startsWith('/_next/static/')
}

function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') ||
         CACHEABLE_APIS.some(api => url.pathname.startsWith(api))
}

function isImageRequest(url) {
  return url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico)$/) ||
         url.pathname.startsWith('/images/')
}

function isCriticalAPI(pathname) {
  const criticalAPIs = [
    '/api/user-profile',
    '/api/auth',
    '/api/user-journey'
  ]
  return criticalAPIs.some(api => pathname.startsWith(api))
}

function isExpired(response, ttl) {
  const cachedAt = response.headers.get('sw-cached-at')
  if (!cachedAt) return true
  
  const age = Date.now() - parseInt(cachedAt)
  return age > ttl
}

async function updateCache(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      const responseToCache = networkResponse.clone()
      responseToCache.headers.set('sw-cached-at', Date.now().toString())
      cache.put(request, responseToCache)
    }
  } catch (error) {
    console.log('Service Worker: Background update failed:', error)
  }
}

// 📨 Handle messages from main thread
self.addEventListener('message', (event) => {
  const { type, payload } = event.data

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
      
    case 'CACHE_URLS':
      event.waitUntil(cacheUrls(payload.urls))
      break
      
    case 'CLEAR_CACHE':
      event.waitUntil(clearCache(payload.cacheName))
      break
      
    case 'GET_CACHE_STATUS':
      event.waitUntil(getCacheStatus().then(status => {
        event.ports[0].postMessage(status)
      }))
      break
      
    default:
      console.log('Service Worker: Unknown message type:', type)
  }
})

// 📦 Cache specific URLs
async function cacheUrls(urls) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    await cache.addAll(urls)
    console.log('Service Worker: Cached URLs:', urls)
  } catch (error) {
    console.log('Service Worker: Failed to cache URLs:', error)
  }
}

// 🗑️ Clear specific cache
async function clearCache(cacheName) {
  try {
    const deleted = await caches.delete(cacheName || CACHE_NAME)
    console.log('Service Worker: Cache cleared:', cacheName, deleted)
  } catch (error) {
    console.log('Service Worker: Failed to clear cache:', error)
  }
}

// 📊 Get cache status
async function getCacheStatus() {
  try {
    const cacheNames = await caches.keys()
    const status = {
      caches: cacheNames,
      totalCaches: cacheNames.length,
      timestamp: Date.now()
    }

    // Get cache sizes
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName)
      const keys = await cache.keys()
      status[cacheName] = {
        entries: keys.length,
        urls: keys.map(req => req.url)
      }
    }

    return status
  } catch (error) {
    console.log('Service Worker: Failed to get cache status:', error)
    return { error: error.message }
  }
}

// 🔄 Periodic cache cleanup
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(performCacheCleanup())
  }
})

async function performCacheCleanup() {
  try {
    const cacheNames = await caches.keys()
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName)
      const requests = await cache.keys()
      
      for (const request of requests) {
        const response = await cache.match(request)
        if (response && isExpired(response, 7 * 24 * 60 * 60 * 1000)) { // 7 days
          await cache.delete(request)
          console.log('Service Worker: Cleaned up expired cache entry:', request.url)
        }
      }
    }
  } catch (error) {
    console.log('Service Worker: Cache cleanup failed:', error)
  }
}

console.log('Service Worker: Loaded and ready! 🚀')
