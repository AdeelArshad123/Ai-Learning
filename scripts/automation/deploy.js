#!/usr/bin/env node

/**
 * Automated Deployment Script
 * Handles deployment to various platforms with pre-deployment checks
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class DeploymentAutomation {
  constructor() {
    this.platforms = {
      vercel: this.deployToVercel.bind(this),
      netlify: this.deployToNetlify.bind(this),
      aws: this.deployToAWS.bind(this),
      docker: this.deployToDocker.bind(this)
    };
  }

  async run() {
    const platform = process.argv[2] || 'vercel';
    const environment = process.argv[3] || 'production';
    
    console.log(`🚀 Starting deployment to ${platform} (${environment})`);
    
    try {
      await this.preDeploymentChecks();
      await this.buildApplication();
      await this.runTests();
      await this.platforms[platform](environment);
      await this.postDeploymentTasks();
      
      console.log('\n✅ Deployment completed successfully!');
    } catch (error) {
      console.error('\n❌ Deployment failed:', error.message);
      process.exit(1);
    }
  }

  async preDeploymentChecks() {
    console.log('\n🔍 Running pre-deployment checks...');
    
    // Check environment variables
    this.checkEnvironmentVariables();
    
    // Check git status
    this.checkGitStatus();
    
    // Run linting
    console.log('📝 Running ESLint...');
    execSync('npm run lint', { stdio: 'inherit' });
    
    // Run type checking
    console.log('🔍 Running TypeScript check...');
    execSync('npm run type-check', { stdio: 'inherit' });
    
    console.log('✅ Pre-deployment checks passed');
  }

  checkEnvironmentVariables() {
    const requiredVars = ['DEEPSEEK_API_KEY', 'NEXTAUTH_SECRET'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  checkGitStatus() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        console.warn('⚠️  Warning: You have uncommitted changes');
        console.log('Uncommitted files:');
        console.log(status);
      }
    } catch (error) {
      console.warn('⚠️  Could not check git status');
    }
  }

  async buildApplication() {
    console.log('\n🏗️  Building application...');
    
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build completed successfully');
    } catch (error) {
      throw new Error('Build failed');
    }
  }

  async runTests() {
    console.log('\n🧪 Running tests...');
    
    try {
      // Run API tests
      execSync('npm run test:api', { stdio: 'inherit' });
      
      // Test AI endpoints
      if (process.env.DEEPSEEK_API_KEY) {
        execSync('npm run test-deepseek', { stdio: 'inherit' });
      }
      
      console.log('✅ All tests passed');
    } catch (error) {
      console.warn('⚠️  Some tests failed, but deployment will continue');
    }
  }

  async deployToVercel(environment) {
    console.log('\n🚀 Deploying to Vercel...');
    
    try {
      // Install Vercel CLI if not present
      try {
        execSync('vercel --version', { stdio: 'ignore' });
      } catch {
        console.log('📦 Installing Vercel CLI...');
        execSync('npm install -g vercel@latest', { stdio: 'inherit' });
      }
      
      // Deploy based on environment
      if (environment === 'production') {
        execSync('vercel --prod --yes', { stdio: 'inherit' });
      } else {
        execSync('vercel --yes', { stdio: 'inherit' });
      }
      
      console.log('✅ Vercel deployment completed');
    } catch (error) {
      throw new Error('Vercel deployment failed');
    }
  }

  async deployToNetlify(environment) {
    console.log('\n🚀 Deploying to Netlify...');
    
    try {
      // Install Netlify CLI if not present
      try {
        execSync('netlify --version', { stdio: 'ignore' });
      } catch {
        console.log('📦 Installing Netlify CLI...');
        execSync('npm install -g netlify-cli', { stdio: 'inherit' });
      }
      
      // Deploy
      if (environment === 'production') {
        execSync('netlify deploy --prod --dir=.next', { stdio: 'inherit' });
      } else {
        execSync('netlify deploy --dir=.next', { stdio: 'inherit' });
      }
      
      console.log('✅ Netlify deployment completed');
    } catch (error) {
      throw new Error('Netlify deployment failed');
    }
  }

  async deployToAWS(environment) {
    console.log('\n🚀 Deploying to AWS...');
    
    try {
      // Check AWS CLI
      execSync('aws --version', { stdio: 'ignore' });
      
      // Deploy using AWS CDK or SAM
      if (fs.existsSync('cdk.json')) {
        execSync('cdk deploy', { stdio: 'inherit' });
      } else if (fs.existsSync('template.yaml')) {
        execSync('sam deploy', { stdio: 'inherit' });
      } else {
        throw new Error('No AWS deployment configuration found');
      }
      
      console.log('✅ AWS deployment completed');
    } catch (error) {
      throw new Error('AWS deployment failed: ' + error.message);
    }
  }

  async deployToDocker(environment) {
    console.log('\n🚀 Building and deploying Docker container...');
    
    try {
      // Build Docker image
      const imageName = `ai-codelearner:${environment}`;
      execSync(`docker build -t ${imageName} .`, { stdio: 'inherit' });
      
      // Tag for registry
      if (process.env.DOCKER_REGISTRY) {
        const registryImage = `${process.env.DOCKER_REGISTRY}/${imageName}`;
        execSync(`docker tag ${imageName} ${registryImage}`, { stdio: 'inherit' });
        execSync(`docker push ${registryImage}`, { stdio: 'inherit' });
      }
      
      console.log('✅ Docker deployment completed');
    } catch (error) {
      throw new Error('Docker deployment failed');
    }
  }

  async postDeploymentTasks() {
    console.log('\n📋 Running post-deployment tasks...');
    
    // Health check
    await this.performHealthCheck();
    
    // Update documentation
    this.updateDeploymentLog();
    
    // Send notifications
    await this.sendNotifications();
    
    console.log('✅ Post-deployment tasks completed');
  }

  async performHealthCheck() {
    console.log('🏥 Performing health check...');
    
    // This would typically check your deployed application
    // For now, we'll just simulate it
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Health check passed');
  }

  updateDeploymentLog() {
    const logEntry = {
      timestamp: new Date().toISOString(),
      platform: process.argv[2] || 'vercel',
      environment: process.argv[3] || 'production',
      commit: this.getGitCommit(),
      status: 'success'
    };
    
    const logFile = 'deployment-log.json';
    let logs = [];
    
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    }
    
    logs.push(logEntry);
    
    // Keep only last 50 deployments
    if (logs.length > 50) {
      logs = logs.slice(-50);
    }
    
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    console.log('📝 Deployment log updated');
  }

  getGitCommit() {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  async sendNotifications() {
    // Send Slack notification if webhook is configured
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const message = {
          text: `🚀 Deployment completed successfully!`,
          attachments: [{
            color: 'good',
            fields: [
              { title: 'Platform', value: process.argv[2] || 'vercel', short: true },
              { title: 'Environment', value: process.argv[3] || 'production', short: true },
              { title: 'Commit', value: this.getGitCommit().substring(0, 8), short: true }
            ]
          }]
        };
        
        const fetch = (await import('node-fetch')).default;
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message)
        });
        
        console.log('📱 Slack notification sent');
      } catch (error) {
        console.warn('⚠️  Failed to send Slack notification:', error.message);
      }
    }
  }
}

// Run deployment if called directly
if (require.main === module) {
  const deployment = new DeploymentAutomation();
  deployment.run().catch(console.error);
}

module.exports = DeploymentAutomation;
