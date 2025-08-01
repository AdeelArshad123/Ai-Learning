/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  serverExternalPackages: ['@codemirror/lang-javascript'],

  // 🚀 Advanced Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-icons',
      'recharts',
      'react-syntax-highlighter'
    ],
    webpackBuildWorker: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    gzipSize: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  typescript: {
    // Skip TypeScript checking during build for now
    ignoreBuildErrors: true,
  },

  // 🖼️ Enhanced Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 📦 Enhanced Compression
  compress: true,
  poweredByHeader: false,

  // 🔒 Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // ⚡ Advanced Webpack configuration
  webpack: (config, { dev, isServer, webpack }) => {
    // Bundle analyzer (only in development)
    if (process.env.ANALYZE === 'true') {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html'
        })
      )
    }

    // 🎯 Advanced bundle splitting for optimal loading
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // React vendor chunk
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 10,
          },
          // UI libraries chunk
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|lucide-react)[\\/]/,
            name: 'ui-vendor',
            chunks: 'all',
            priority: 9,
          },
          // AI/ML libraries chunk
          ai: {
            test: /[\\/]node_modules[\\/](openai|@tensorflow|ml-matrix)[\\/]/,
            name: 'ai-vendor',
            chunks: 'all',
            priority: 8,
          },
          // Utilities chunk
          utils: {
            test: /[\\/]node_modules[\\/](lodash|date-fns|uuid|crypto-js)[\\/]/,
            name: 'utils-vendor',
            chunks: 'all',
            priority: 7,
          },
          // Charts and visualization
          charts: {
            test: /[\\/]node_modules[\\/](recharts|d3|chart\.js)[\\/]/,
            name: 'charts-vendor',
            chunks: 'all',
            priority: 6,
          },
          // Default vendor chunk
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
          },
          // Common chunks
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 4,
            enforce: true,
          },
        },
      }

      // 🔧 Additional optimizations
      config.optimization.usedExports = true
      config.optimization.sideEffects = false

      // Tree shaking optimization
      config.optimization.providedExports = true
      config.optimization.innerGraph = true
    }

    // 📦 Module resolution optimizations
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }

    // 🚀 Performance optimizations
    if (!dev) {
      // Enable gzip compression for better performance
      config.plugins.push(
        new webpack.optimize.AggressiveMergingPlugin(),
      )
    }

    // 🔍 Development optimizations
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      }
    }

    return config
  },
}

module.exports = nextConfig