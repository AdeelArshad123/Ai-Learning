#!/usr/bin/env node

/**
 * Automated API Testing Suite
 * Tests all API endpoints for functionality and performance
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');

class APITester {
  constructor() {
    this.baseUrl = process.env.TEST_URL || 'http://localhost:3000';
    this.results = [];
    this.timeout = 10000; // 10 seconds
  }

  async run() {
    console.log('🧪 Starting API Test Suite\n');
    console.log(`Testing against: ${this.baseUrl}\n`);

    try {
      await this.testHealthEndpoints();
      await this.testAIEndpoints();
      await this.testDataEndpoints();
      await this.testAuthEndpoints();
      
      this.generateReport();
      
      const failed = this.results.filter(r => !r.success).length;
      if (failed > 0) {
        console.log(`\n❌ ${failed} tests failed`);
        process.exit(1);
      } else {
        console.log('\n✅ All API tests passed!');
      }
    } catch (error) {
      console.error('\n❌ Test suite failed:', error.message);
      process.exit(1);
    }
  }

  async testHealthEndpoints() {
    console.log('🏥 Testing Health Endpoints...');
    
    // Test basic health check
    await this.testEndpoint('GET', '/api/health', {
      expectedStatus: 200,
      description: 'Health check endpoint'
    });
  }

  async testAIEndpoints() {
    console.log('\n🤖 Testing AI Endpoints...');
    
    // Test code generation endpoint
    await this.testEndpoint('POST', '/api/generate-code', {
      expectedStatus: 200,
      body: {
        topic: 'Hello World',
        language: 'JavaScript',
        difficulty: 'beginner'
      },
      description: 'AI code generation',
      timeout: 30000 // AI endpoints take longer
    });

    // Test quiz generation endpoint
    await this.testEndpoint('POST', '/api/generate-quiz', {
      expectedStatus: 200,
      body: {
        topic: 'JavaScript Basics',
        language: 'JavaScript',
        difficulty: 'beginner'
      },
      description: 'AI quiz generation',
      timeout: 30000
    });
  }

  async testDataEndpoints() {
    console.log('\n📊 Testing Data Endpoints...');
    
    // Test trending tools
    await this.testEndpoint('GET', '/api/get-trending', {
      expectedStatus: 200,
      description: 'Trending GitHub repositories'
    });

    // Test YouTube channels
    await this.testEndpoint('GET', '/api/get-youtube-channels', {
      expectedStatus: 200,
      description: 'YouTube programming channels'
    });

    // Test learning topics
    await this.testEndpoint('GET', '/api/learning-topics', {
      expectedStatus: 200,
      description: 'Learning topics list'
    });

    // Test search endpoint
    await this.testEndpoint('GET', '/api/search?q=javascript', {
      expectedStatus: 200,
      description: 'Search functionality'
    });
  }

  async testAuthEndpoints() {
    console.log('\n🔐 Testing Auth Endpoints...');
    
    // Test NextAuth configuration
    await this.testEndpoint('GET', '/api/auth/providers', {
      expectedStatus: 200,
      description: 'Auth providers configuration'
    });
  }

  async testEndpoint(method, path, options = {}) {
    const {
      expectedStatus = 200,
      body = null,
      headers = {},
      description = path,
      timeout = this.timeout
    } = options;

    const startTime = Date.now();
    
    try {
      const response = await this.makeRequest(method, path, body, headers, timeout);
      const duration = Date.now() - startTime;
      
      const success = response.statusCode === expectedStatus;
      
      this.results.push({
        method,
        path,
        description,
        expectedStatus,
        actualStatus: response.statusCode,
        duration,
        success,
        error: success ? null : `Expected ${expectedStatus}, got ${response.statusCode}`
      });

      const status = success ? '✅' : '❌';
      const durationStr = `${duration}ms`;
      console.log(`  ${status} ${method} ${path} - ${response.statusCode} (${durationStr})`);
      
      if (!success) {
        console.log(`     Expected: ${expectedStatus}, Got: ${response.statusCode}`);
        if (response.body) {
          console.log(`     Response: ${response.body.substring(0, 200)}...`);
        }
      }

    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.results.push({
        method,
        path,
        description,
        expectedStatus,
        actualStatus: 'ERROR',
        duration,
        success: false,
        error: error.message
      });

      console.log(`  ❌ ${method} ${path} - ERROR (${duration}ms)`);
      console.log(`     ${error.message}`);
    }
  }

  makeRequest(method, path, body, headers, timeout) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.baseUrl);
      const isHttps = url.protocol === 'https:';
      const httpModule = isHttps ? https : http;
      
      const requestOptions = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'API-Tester/1.0',
          ...headers
        },
        timeout
      };

      if (body) {
        const bodyString = JSON.stringify(body);
        requestOptions.headers['Content-Length'] = Buffer.byteLength(bodyString);
      }

      const req = httpModule.request(requestOptions, (res) => {
        let responseBody = '';
        
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: responseBody
          });
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`Request timeout after ${timeout}ms`));
      });

      if (body) {
        req.write(JSON.stringify(body));
      }
      
      req.end();
    });
  }

  generateReport() {
    console.log('\n📊 Test Results Summary');
    console.log('========================');
    
    const total = this.results.length;
    const passed = this.results.filter(r => r.success).length;
    const failed = total - passed;
    
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    
    const avgDuration = this.results.reduce((sum, r) => sum + r.duration, 0) / total;
    console.log(`Average Response Time: ${avgDuration.toFixed(0)}ms`);
    
    if (failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results
        .filter(r => !r.success)
        .forEach(r => {
          console.log(`  • ${r.method} ${r.path}: ${r.error}`);
        });
    }
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: { total, passed, failed, successRate: (passed / total) * 100, avgDuration },
      results: this.results
    };
    
    require('fs').writeFileSync('api-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 Detailed report saved to api-test-report.json');
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new APITester();
  tester.run().catch(console.error);
}

module.exports = APITester;
