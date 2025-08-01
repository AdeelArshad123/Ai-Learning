import { NextRequest, NextResponse } from 'next/server'
import { smartCacheEngine } from '@/lib/smart-cache-engine'

// 🚀 Smart Cache Management API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, key, data, tags, config } = body

    switch (action) {
      case 'set':
        if (!key || data === undefined) {
          return NextResponse.json(
            { error: 'Key and data are required for set operation' },
            { status: 400 }
          )
        }

        await smartCacheEngine.set(key, data, config)

        return NextResponse.json({
          success: true,
          message: 'Cache entry set successfully',
          key,
          timestamp: new Date().toISOString()
        })

      case 'get':
        if (!key) {
          return NextResponse.json(
            { error: 'Key is required for get operation' },
            { status: 400 }
          )
        }

        const cachedData = await smartCacheEngine.get(key)

        return NextResponse.json({
          success: true,
          data: cachedData,
          cached: cachedData !== null,
          key,
          timestamp: new Date().toISOString()
        })

      case 'delete':
        if (!key) {
          return NextResponse.json(
            { error: 'Key is required for delete operation' },
            { status: 400 }
          )
        }

        const deleted = await smartCacheEngine.delete(key)

        return NextResponse.json({
          success: true,
          deleted,
          key,
          timestamp: new Date().toISOString()
        })

      case 'invalidate-tags':
        if (!tags || !Array.isArray(tags)) {
          return NextResponse.json(
            { error: 'Tags array is required for invalidation' },
            { status: 400 }
          )
        }

        const invalidatedCount = await smartCacheEngine.invalidateByTags(tags)

        return NextResponse.json({
          success: true,
          invalidatedCount,
          tags,
          timestamp: new Date().toISOString()
        })

      case 'clear':
        await smartCacheEngine.clear()

        return NextResponse.json({
          success: true,
          message: 'Cache cleared successfully',
          timestamp: new Date().toISOString()
        })

      case 'warm-cache':
        if (!body.keys || !Array.isArray(body.keys)) {
          return NextResponse.json(
            { error: 'Keys array is required for cache warming' },
            { status: 400 }
          )
        }

        await smartCacheEngine.warmCache(body.keys)

        return NextResponse.json({
          success: true,
          message: 'Cache warming initiated',
          keys: body.keys,
          timestamp: new Date().toISOString()
        })

      case 'stale-while-revalidate':
        if (!key || !body.fetchFunction) {
          return NextResponse.json(
            { error: 'Key and fetch function are required' },
            { status: 400 }
          )
        }

        // Create a mock fetch function for demonstration
        const mockFetchFn = async () => {
          // In real implementation, this would be the actual data fetching logic
          return {
            data: `Fresh data for ${key}`,
            timestamp: new Date().toISOString(),
            source: 'network'
          }
        }

        const result = await smartCacheEngine.staleWhileRevalidate(key, mockFetchFn)

        return NextResponse.json({
          success: true,
          data: result,
          key,
          timestamp: new Date().toISOString()
        })

      case 'batch-set':
        if (!body.entries || !Array.isArray(body.entries)) {
          return NextResponse.json(
            { error: 'Entries array is required for batch set' },
            { status: 400 }
          )
        }

        const batchResults = await Promise.allSettled(
          body.entries.map(async (entry: any) => {
            await smartCacheEngine.set(entry.key, entry.data, entry.config)
            return entry.key
          })
        )

        const successful = batchResults.filter(r => r.status === 'fulfilled').length
        const failed = batchResults.filter(r => r.status === 'rejected').length

        return NextResponse.json({
          success: true,
          message: 'Batch set completed',
          successful,
          failed,
          total: body.entries.length,
          timestamp: new Date().toISOString()
        })

      case 'batch-get':
        if (!body.keys || !Array.isArray(body.keys)) {
          return NextResponse.json(
            { error: 'Keys array is required for batch get' },
            { status: 400 }
          )
        }

        const batchData = await Promise.all(
          body.keys.map(async (key: string) => {
            const data = await smartCacheEngine.get(key)
            return { key, data, cached: data !== null }
          })
        )

        return NextResponse.json({
          success: true,
          data: batchData,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: set, get, delete, invalidate-tags, clear, warm-cache, stale-while-revalidate, batch-set, or batch-get' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error('Error in cache management:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Cache operation failed',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📊 Get cache statistics and information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const info = searchParams.get('info')
    const key = searchParams.get('key')

    if (info === 'stats') {
      const stats = smartCacheEngine.getStats()

      return NextResponse.json({
        success: true,
        stats,
        timestamp: new Date().toISOString()
      })
    }

    if (info === 'capabilities') {
      return NextResponse.json({
        success: true,
        capabilities: {
          cacheStrategies: [
            {
              name: 'cache-first',
              description: 'Serve from cache first, fallback to network',
              useCase: 'Static assets, rarely changing data'
            },
            {
              name: 'network-first',
              description: 'Try network first, fallback to cache',
              useCase: 'Dynamic data, real-time updates'
            },
            {
              name: 'stale-while-revalidate',
              description: 'Serve stale cache while updating in background',
              useCase: 'Balance between speed and freshness'
            },
            {
              name: 'cache-only',
              description: 'Only serve from cache',
              useCase: 'Offline-first scenarios'
            },
            {
              name: 'network-only',
              description: 'Always fetch from network',
              useCase: 'Critical real-time data'
            }
          ],
          features: [
            'Intelligent TTL management',
            'Tag-based invalidation',
            'Compression and encryption',
            'Priority-based caching',
            'Batch operations',
            'Cache warming',
            'Stale-while-revalidate',
            'Performance monitoring',
            'CDN integration ready'
          ],
          dataTypes: [
            'API responses',
            'Static assets',
            'Dynamic content',
            'User-specific data',
            'Search results',
            'Recommendations'
          ]
        }
      })
    }

    if (info === 'config') {
      return NextResponse.json({
        success: true,
        config: {
          defaultTTL: {
            'api:user-profile': '5 minutes',
            'api:learning-content': '1 hour',
            'api:analytics': '15 minutes',
            'api:ai-generated': '2 hours',
            'static:images': '24 hours',
            'static:fonts': '7 days',
            'static:css': '24 hours',
            'static:js': '24 hours'
          },
          strategies: {
            'api': 'stale-while-revalidate',
            'static': 'cache-first',
            'dynamic': 'network-first'
          },
          features: {
            compression: 'Enabled for large responses',
            encryption: 'Enabled for sensitive data',
            cdnIntegration: 'Ready for Vercel/Cloudflare',
            offlineSupport: 'Service Worker integration'
          }
        }
      })
    }

    if (info === 'health') {
      const stats = smartCacheEngine.getStats()
      const health = {
        status: 'healthy',
        uptime: Date.now(),
        cacheSize: stats.totalSize,
        hitRate: stats.hitRate,
        performance: stats.averageResponseTime < 100 ? 'excellent' : 
                    stats.averageResponseTime < 500 ? 'good' : 'needs-optimization'
      }

      return NextResponse.json({
        success: true,
        health,
        timestamp: new Date().toISOString()
      })
    }

    if (key) {
      // Get specific cache entry info
      const data = await smartCacheEngine.get(key)
      
      return NextResponse.json({
        success: true,
        key,
        exists: data !== null,
        data: data !== null ? data : undefined,
        timestamp: new Date().toISOString()
      })
    }

    // Default: Return usage information
    return NextResponse.json({
      success: true,
      message: 'Smart Cache Management API',
      description: 'Intelligent caching with multiple strategies and CDN integration',
      usage: {
        POST: {
          description: 'Execute cache operations',
          actions: [
            {
              action: 'set',
              description: 'Store data in cache',
              parameters: ['key', 'data', 'config?']
            },
            {
              action: 'get',
              description: 'Retrieve data from cache',
              parameters: ['key']
            },
            {
              action: 'delete',
              description: 'Remove cache entry',
              parameters: ['key']
            },
            {
              action: 'invalidate-tags',
              description: 'Invalidate entries by tags',
              parameters: ['tags[]']
            },
            {
              action: 'clear',
              description: 'Clear all cache entries',
              parameters: []
            },
            {
              action: 'warm-cache',
              description: 'Preload cache with data',
              parameters: ['keys[]']
            },
            {
              action: 'stale-while-revalidate',
              description: 'Implement SWR strategy',
              parameters: ['key', 'fetchFunction']
            },
            {
              action: 'batch-set',
              description: 'Set multiple cache entries',
              parameters: ['entries[]']
            },
            {
              action: 'batch-get',
              description: 'Get multiple cache entries',
              parameters: ['keys[]']
            }
          ]
        },
        GET: {
          description: 'Get cache information and statistics',
          parameters: [
            '?info=stats - Get cache statistics',
            '?info=capabilities - Get cache capabilities',
            '?info=config - Get cache configuration',
            '?info=health - Get cache health status',
            '?key=<key> - Get specific cache entry info'
          ]
        }
      },
      examples: {
        setCache: {
          action: 'set',
          key: 'user:123:profile',
          data: { name: 'John Doe', email: 'john@example.com' },
          config: { ttl: 300, tags: ['user', 'profile'] }
        },
        getCache: {
          action: 'get',
          key: 'user:123:profile'
        },
        invalidateTags: {
          action: 'invalidate-tags',
          tags: ['user', 'profile']
        },
        batchSet: {
          action: 'batch-set',
          entries: [
            { key: 'key1', data: 'data1' },
            { key: 'key2', data: 'data2' }
          ]
        }
      }
    })

  } catch (error: any) {
    console.error('Error in cache GET:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get cache info',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
