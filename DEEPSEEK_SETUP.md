# DeepSeek API Setup Guide

## Step 1: Get Your DeepSeek API Key

1. **Visit DeepSeek Platform:**
   - Go to [https://platform.deepseek.com/](https://platform.deepseek.com/)
   - Sign up or log in to your account

2. **Create API Key:**
   - Navigate to "API Keys" section
   - Click "Create new API key"
   - Give it a name (e.g., "SaaS Learning Platform")
   - Copy the generated key

## Step 2: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
   ```bash
   # Create the file
   touch .env.local
   ```

2. **Add your DeepSeek API key** to `.env.local`:
   ```env
   # DeepSeek API Configuration
   DEEPSEEK_API_KEY=your_actual_api_key_here
   
   # NextAuth Configuration (Optional)
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # Optional: Authentication Providers
   # GOOGLE_CLIENT_ID=your_google_client_id
   # GOOGLE_CLIENT_SECRET=your_google_client_secret
   # GITHUB_CLIENT_ID=your_github_client_id
   # GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

## Step 3: Test DeepSeek Configuration

```bash
npm run test-deepseek
```

## Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Step 5: Test AI Code Generation

1. **Navigate to your app:** http://localhost:3001
2. **Go to AI Code Generator section**
3. **Select a language** (JavaScript, Python, etc.)
4. **Enter a topic** (e.g., "Async/Await", "React Hooks")
5. **Choose difficulty** (Beginner, Intermediate, Advanced)
6. **Click "Generate Code"**

## Features Available with DeepSeek

### ✅ AI Code Generation
- **13+ Programming Languages:** JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, Dart
- **Smart Explanations:** Beginner-friendly explanations with code
- **Key Learning Points:** Extracted learning objectives
- **Difficulty Levels:** Adaptive content based on skill level

### ✅ AI Quiz Generation
- **Dynamic Quizzes:** AI-generated questions for any topic
- **Adaptive Difficulty:** Questions adjust based on performance
- **Detailed Explanations:** Learn from correct answers
- **Multiple Choice:** Professional quiz format

## API Endpoints Using DeepSeek

### `/api/generate-code`
- **Method:** POST
- **Purpose:** Generate AI-powered code examples
- **Parameters:** language, topic, difficulty
- **Response:** Code, explanation, learning points

### `/api/generate-quiz`
- **Method:** POST
- **Purpose:** Create adaptive quizzes
- **Parameters:** language, topic, difficulty
- **Response:** Quiz questions with explanations

## DeepSeek vs OpenAI Comparison

| Feature | DeepSeek | OpenAI |
|---------|----------|--------|
| **Cost** | Generally more affordable | Higher cost |
| **Performance** | Excellent for code generation | Excellent all-around |
| **API Limits** | Generous limits | Rate limited |
| **Model Quality** | Very good for programming | Industry leading |
| **Setup** | Simple API key | Simple API key |

## Troubleshooting

### Common Issues:

1. **"DeepSeek API key not configured"**
   - Ensure `.env.local` file exists in project root
   - Check that `DEEPSEEK_API_KEY` is set correctly
   - Restart the development server

2. **"Failed to generate code"**
   - Verify your API key is valid
   - Check your DeepSeek account has sufficient credits
   - Ensure stable internet connection

3. **"Rate limit exceeded"**
   - DeepSeek has generous rate limits
   - Check your account usage in DeepSeek dashboard

4. **"Invalid API key"**
   - Double-check the API key format
   - Ensure no extra spaces or characters

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Keep your API key secure**
3. **Monitor your DeepSeek usage** to avoid unexpected charges
4. **Use environment variables** for all sensitive data

## Cost Management

- **Free Tier:** Generous free credits for new users
- **Pay-as-you-go:** Very affordable pricing
- **Monitor usage** in DeepSeek dashboard
- **Set spending limits** to control costs

## Example Usage

### Generate JavaScript Code:
```json
{
  "language": "JavaScript",
  "topic": "Async/Await",
  "difficulty": "beginner"
}
```

### Generate Python Quiz:
```json
{
  "language": "Python",
  "topic": "Functions and Methods",
  "difficulty": "intermediate"
}
```

## Migration from OpenAI

If you're migrating from OpenAI to DeepSeek:

1. **Get DeepSeek API key** from [platform.deepseek.com](https://platform.deepseek.com/)
2. **Update `.env.local`** with your DeepSeek key
3. **Test the configuration** with `npm run test-deepseek`
4. **Restart your server** and test the features

## Next Steps

1. **Test the AI features** with your DeepSeek API key
2. **Explore different topics** and languages
3. **Customize the prompts** in the API routes if needed
4. **Add more learning content** to your platform

Your SaaS learning platform is now ready with DeepSeek AI capabilities! 🚀 