// 🧪 Test script for AI API Generator
// Run this script to test the API endpoint

const testAPIGenerator = async () => {
  console.log('🚀 Testing AI API Generator...\n')

  try {
    // Test GET endpoint first
    console.log('1. Testing GET /api/ai-api-generator')
    const getResponse = await fetch('http://localhost:3000/api/ai-api-generator')
    
    if (!getResponse.ok) {
      throw new Error(`GET request failed: ${getResponse.statusText}`)
    }
    
    const getResult = await getResponse.json()
    console.log('✅ GET endpoint working')
    console.log('Supported languages:', getResult.supportedLanguages.join(', '))
    console.log('Supported auth methods:', getResult.supportedAuth.join(', '))
    console.log('Supported databases:', getResult.supportedDatabases.join(', '))
    console.log('')

    // Test POST endpoint with a simple request
    console.log('2. Testing POST /api/ai-api-generator')
    const testRequest = {
      description: 'Create a simple REST API for managing books. Users should be able to add, view, update, and delete books. Each book has a title, author, ISBN, and publication year.',
      languages: ['javascript', 'python'],
      authType: 'jwt',
      database: 'mongodb',
      complexity: 'simple',
      includeTests: true,
      includeDocs: true
    }

    console.log('Sending request with:', JSON.stringify(testRequest, null, 2))
    console.log('⏳ Generating API... (this may take 30-60 seconds)')

    const postResponse = await fetch('http://localhost:3000/api/ai-api-generator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRequest)
    })

    if (!postResponse.ok) {
      const errorText = await postResponse.text()
      throw new Error(`POST request failed: ${postResponse.statusText}\n${errorText}`)
    }

    const postResult = await postResponse.json()
    
    if (postResult.success) {
      console.log('✅ POST endpoint working')
      console.log(`Generated ${postResult.data.generatedAPIs.length} API implementations`)
      
      postResult.data.generatedAPIs.forEach((api, index) => {
        console.log(`\n📦 API ${index + 1}: ${api.language} (${api.framework})`)
        console.log(`   Files generated: ${api.files.length}`)
        console.log(`   File types: ${[...new Set(api.files.map(f => f.type))].join(', ')}`)
        
        if (api.validation) {
          console.log(`   Validation score: ${api.validation.score}/100`)
          console.log(`   Issues found: ${api.validation.issues.length}`)
          if (api.validation.issues.length > 0) {
            console.log(`   Top issue: ${api.validation.issues[0].message}`)
          }
        }
      })

      console.log('\n📋 Requirements Analysis:')
      console.log(`   Entities: ${postResult.data.requirements.entities?.join(', ') || 'N/A'}`)
      console.log(`   Endpoints: ${postResult.data.requirements.endpoints?.length || 0}`)

      console.log('\n🏗️ Architecture:')
      console.log(`   Authentication: ${postResult.data.architecture?.authentication?.type || 'N/A'}`)
      console.log(`   Database: ${postResult.data.architecture?.database?.type || 'N/A'}`)

      // Show sample file content
      if (postResult.data.generatedAPIs.length > 0 && postResult.data.generatedAPIs[0].files.length > 0) {
        const sampleFile = postResult.data.generatedAPIs[0].files[0]
        console.log(`\n📄 Sample file (${sampleFile.path}):`)
        console.log('─'.repeat(50))
        console.log(sampleFile.content.substring(0, 300) + '...')
        console.log('─'.repeat(50))
      }

    } else {
      throw new Error(`API generation failed: ${postResult.error || 'Unknown error'}`)
    }

    console.log('\n🎉 All tests passed! AI API Generator is working correctly.')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    
    if (error.message.includes('fetch')) {
      console.log('\n💡 Make sure the development server is running:')
      console.log('   npm run dev')
      console.log('   Then try running this test again.')
    }
    
    if (error.message.includes('DeepSeek')) {
      console.log('\n💡 Check your DeepSeek API configuration:')
      console.log('   1. Verify DEEPSEEK_API_KEY in .env.local')
      console.log('   2. Check your DeepSeek API quota/limits')
      console.log('   3. Ensure internet connection is working')
    }
  }
}

// Run the test
testAPIGenerator()

// Export for use in other test files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testAPIGenerator }
}
