<<<<<<< HEAD
#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const OpenAI = require('openai');

async function testOpenAI() {
  console.log('🧪 Testing OpenAI API configuration...\n');

  // Check if API key is set
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    console.log('❌ OpenAI API key not configured!');
    console.log('📝 Please edit .env.local and add your OpenAI API key.');
    console.log('🔑 Get your API key from: https://platform.openai.com/api-keys\n');
    return;
  }

  if (!apiKey.startsWith('sk-')) {
    console.log('❌ Invalid OpenAI API key format!');
    console.log('🔑 API key should start with "sk-"\n');
    return;
  }

  console.log('✅ API key format looks correct');
  console.log('🔄 Testing API connection...\n');

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful programming tutor. Respond with a simple greeting."
        },
        {
          role: "user",
          content: "Hello! Can you help me learn programming?"
        }
      ],
      max_tokens: 50,
    });

    console.log('✅ OpenAI API connection successful!');
    console.log('🤖 Response:', completion.choices[0]?.message?.content);
    console.log('\n🎉 Your SaaS Learning Platform is ready for AI features!');
    
  } catch (error) {
    console.log('❌ OpenAI API test failed:');
    console.log('Error:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 This usually means your API key is invalid.');
      console.log('🔑 Please check your API key in .env.local');
    } else if (error.message.includes('429')) {
      console.log('\n💡 This usually means you\'ve hit the rate limit.');
      console.log('💰 Check your OpenAI account for usage limits.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 This usually means a network connection issue.');
      console.log('🌐 Please check your internet connection.');
    }
  }
}

=======
#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const OpenAI = require('openai');

async function testOpenAI() {
  console.log('🧪 Testing OpenAI API configuration...\n');

  // Check if API key is set
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    console.log('❌ OpenAI API key not configured!');
    console.log('📝 Please edit .env.local and add your OpenAI API key.');
    console.log('🔑 Get your API key from: https://platform.openai.com/api-keys\n');
    return;
  }

  if (!apiKey.startsWith('sk-')) {
    console.log('❌ Invalid OpenAI API key format!');
    console.log('🔑 API key should start with "sk-"\n');
    return;
  }

  console.log('✅ API key format looks correct');
  console.log('🔄 Testing API connection...\n');

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful programming tutor. Respond with a simple greeting."
        },
        {
          role: "user",
          content: "Hello! Can you help me learn programming?"
        }
      ],
      max_tokens: 50,
    });

    console.log('✅ OpenAI API connection successful!');
    console.log('🤖 Response:', completion.choices[0]?.message?.content);
    console.log('\n🎉 Your SaaS Learning Platform is ready for AI features!');
    
  } catch (error) {
    console.log('❌ OpenAI API test failed:');
    console.log('Error:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 This usually means your API key is invalid.');
      console.log('🔑 Please check your API key in .env.local');
    } else if (error.message.includes('429')) {
      console.log('\n💡 This usually means you\'ve hit the rate limit.');
      console.log('💰 Check your OpenAI account for usage limits.');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 This usually means a network connection issue.');
      console.log('🌐 Please check your internet connection.');
    }
  }
}

>>>>>>> 7d750ccee6fd67ca93708119191613680de06a01
testOpenAI(); 