const fetch = require('node-fetch');

async function testAIRecommendations() {
  try {
    console.log('Testing AI Recommendations API...');
    
    // Test GET endpoint (quick recommendations)
    console.log('\n1. Testing GET /api/personalized-recommendations');
    const getResponse = await fetch('http://localhost:3000/api/personalized-recommendations');
    const getData = await getResponse.json();
    console.log('GET Response Status:', getResponse.status);
    console.log('GET Response Data:', JSON.stringify(getData, null, 2));
    
    // Test POST endpoint (personalized recommendations)
    console.log('\n2. Testing POST /api/personalized-recommendations');
    const userProfile = {
      level: 'intermediate',
      interests: ['JavaScript', 'React', 'Node.js'],
      goals: ['Full-stack development', 'Modern JavaScript'],
      weakAreas: ['Async Programming', 'Testing'],
      completedTopics: ['Variables', 'Functions', 'Objects'],
      preferredLearningStyle: 'hands-on',
      timeAvailable: 30
    };
    
    const postResponse = await fetch('http://localhost:3000/api/personalized-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userProfile)
    });
    
    const postData = await postResponse.json();
    console.log('POST Response Status:', postResponse.status);
    console.log('POST Response Data:', JSON.stringify(postData, null, 2));
    
  } catch (error) {
    console.error('Error testing AI recommendations:', error);
  }
}

testAIRecommendations();
