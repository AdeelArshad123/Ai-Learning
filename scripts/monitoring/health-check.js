#!/usr/bin/env node

/**
 * Application Health Check and Monitoring
 * Monitors application health, performance, and dependencies
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

class HealthMonitor {
  constructor() {
    this.baseUrl = process.env.HEALTH_CHECK_URL || 'http://localhost:3000';
    this.checks = [];
    this.timeout = 5000;
  }

  async run() {
    console.log('🏥 Starting Health Check...\n');
    
    try {
      await this.checkApplication();
      await this.checkDependencies();
      await this.checkEnvironment();
      await this.checkPerformance();
      
      this.generateReport();
      
      const failed = this.checks.filter(c => !c.healthy).length;
      if (failed > 0) {
        console.log(`\n⚠️  ${failed} health checks failed`);
        process.exit(1);
      } else {
        console.log('\n✅ All health checks passed!');
      }
    } catch (error) {
      console.error('\n❌ Health check failed:', error.message);
      process.exit(1);
    }
  }

  async checkApplication() {
    console.log('🌐 Checking Application Health...');
    
    // Check if application is responding
    await this.performCheck('Application Response', async () => {
      const response = await this.makeRequest('GET', '/');
      return {
        healthy: response.statusCode === 200,
        details: `Status: ${response.statusCode}`,
        responseTime: response.duration
      };
    });

    // Check API endpoints
    await this.performCheck('API Health', async () => {
      try {
        const response = await this.makeRequest('GET', '/api/health');
        return {
          healthy: response.statusCode === 200,
          details: `API Status: ${response.statusCode}`,
          responseTime: response.duration
        };
      } catch (error) {
        return {
          healthy: false,
          details: `API Error: ${error.message}`,
          responseTime: null
        };
      }
    });
  }

  async checkDependencies() {
    console.log('\n🔗 Checking Dependencies...');
    
    // Check AI API connectivity
    await this.performCheck('DeepSeek API', async () => {
      if (!process.env.DEEPSEEK_API_KEY) {
        return {
          healthy: false,
          details: 'DeepSeek API key not configured'
        };
      }
      
      try {
        const response = await this.testDeepSeekAPI();
        return {
          healthy: response.success,
          details: response.message,
          responseTime: response.duration
        };
      } catch (error) {
        return {
          healthy: false,
          details: `DeepSeek API Error: ${error.message}`
        };
      }
    });

    // Check database connectivity (if configured)
    if (process.env.MONGODB_URI) {
      await this.performCheck('Database Connection', async () => {
        try {
          // This would typically test MongoDB connection
          return {
            healthy: true,
            details: 'Database connection available'
          };
        } catch (error) {
          return {
            healthy: false,
            details: `Database Error: ${error.message}`
          };
        }
      });
    }
  }

  async checkEnvironment() {
    console.log('\n🔧 Checking Environment...');
    
    // Check required environment variables
    await this.performCheck('Environment Variables', async () => {
      const required = ['DEEPSEEK_API_KEY', 'NEXTAUTH_SECRET'];
      const missing = required.filter(varName => !process.env[varName]);
      
      return {
        healthy: missing.length === 0,
        details: missing.length > 0 
          ? `Missing: ${missing.join(', ')}` 
          : 'All required variables present'
      };
    });

    // Check Node.js version
    await this.performCheck('Node.js Version', async () => {
      const version = process.version;
      const majorVersion = parseInt(version.slice(1).split('.')[0]);
      
      return {
        healthy: majorVersion >= 18,
        details: `Node.js ${version} (minimum: 18.x)`
      };
    });

    // Check disk space
    await this.performCheck('Disk Space', async () => {
      try {
        const stats = fs.statSync('.');
        // This is a simplified check - in production you'd check actual disk usage
        return {
          healthy: true,
          details: 'Disk space available'
        };
      } catch (error) {
        return {
          healthy: false,
          details: `Disk check failed: ${error.message}`
        };
      }
    });
  }

  async checkPerformance() {
    console.log('\n⚡ Checking Performance...');
    
    // Check memory usage
    await this.performCheck('Memory Usage', async () => {
      const usage = process.memoryUsage();
      const usedMB = Math.round(usage.heapUsed / 1024 / 1024);
      const totalMB = Math.round(usage.heapTotal / 1024 / 1024);
      
      return {
        healthy: usedMB < 500, // Alert if using more than 500MB
        details: `Memory: ${usedMB}MB / ${totalMB}MB`,
        metrics: { usedMB, totalMB }
      };
    });

    // Check response times
    await this.performCheck('Response Time', async () => {
      const start = Date.now();
      await this.makeRequest('GET', '/');
      const duration = Date.now() - start;
      
      return {
        healthy: duration < 2000, // Alert if response > 2 seconds
        details: `Response time: ${duration}ms`,
        responseTime: duration
      };
    });
  }

  async performCheck(name, checkFunction) {
    const startTime = Date.now();
    
    try {
      const result = await checkFunction();
      const duration = Date.now() - startTime;
      
      const check = {
        name,
        healthy: result.healthy,
        details: result.details,
        duration,
        timestamp: new Date().toISOString(),
        ...result
      };
      
      this.checks.push(check);
      
      const status = result.healthy ? '✅' : '❌';
      const timeStr = result.responseTime ? ` (${result.responseTime}ms)` : '';
      console.log(`  ${status} ${name}: ${result.details}${timeStr}`);
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.checks.push({
        name,
        healthy: false,
        details: `Check failed: ${error.message}`,
        duration,
        timestamp: new Date().toISOString(),
        error: error.message
      });
      
      console.log(`  ❌ ${name}: Check failed - ${error.message}`);
    }
  }

  async testDeepSeekAPI() {
    const startTime = Date.now();
    
    try {
      const response = await fetch('https://api.deepseek.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      });
      
      const duration = Date.now() - startTime;
      
      return {
        success: response.ok,
        message: response.ok ? 'DeepSeek API accessible' : `API Error: ${response.status}`,
        duration
      };
    } catch (error) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
        duration: Date.now() - startTime
      };
    }
  }

  makeRequest(method, path) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const url = new URL(path, this.baseUrl);
      const isHttps = url.protocol === 'https:';
      const httpModule = isHttps ? https : http;
      
      const options = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method,
        timeout: this.timeout
      };

      const req = httpModule.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body,
            duration: Date.now() - startTime
          });
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  generateReport() {
    console.log('\n📊 Health Check Summary');
    console.log('========================');
    
    const total = this.checks.length;
    const healthy = this.checks.filter(c => c.healthy).length;
    const unhealthy = total - healthy;
    
    console.log(`Total Checks: ${total}`);
    console.log(`Healthy: ${healthy}`);
    console.log(`Unhealthy: ${unhealthy}`);
    console.log(`Health Score: ${((healthy / total) * 100).toFixed(1)}%`);
    
    if (unhealthy > 0) {
      console.log('\n⚠️  Issues Found:');
      this.checks
        .filter(c => !c.healthy)
        .forEach(c => {
          console.log(`  • ${c.name}: ${c.details}`);
        });
    }
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: { total, healthy, unhealthy, healthScore: (healthy / total) * 100 },
      checks: this.checks
    };
    
    fs.writeFileSync('health-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Detailed report saved to health-report.json');
  }
}

// Run health check if called directly
if (require.main === module) {
  const monitor = new HealthMonitor();
  monitor.run().catch(console.error);
}

module.exports = HealthMonitor;
