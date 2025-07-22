// Load environment variables manually for testing
require('dotenv').config({ path: '.env.local' })

// Test environment variables
console.log('Testing environment variables...')
console.log('DEEPSEEK_API_KEY exists:', !!process.env.DEEPSEEK_API_KEY)
console.log('DEEPSEEK_API_KEY length:', process.env.DEEPSEEK_API_KEY?.length || 0)
console.log('DEEPSEEK_API_KEY prefix:', process.env.DEEPSEEK_API_KEY?.substring(0, 10) || 'none')

if (process.env.DEEPSEEK_API_KEY) {
  console.log('✅ DeepSeek API key is loaded correctly')
} else {
  console.log('❌ DeepSeek API key is not loaded')
  console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('DEEP')))
}

// Also check if .env.local file exists
const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env.local')
console.log('\n.env.local file check:')
console.log('File exists:', fs.existsSync(envPath))
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  console.log('File content:')
  console.log(content)
}