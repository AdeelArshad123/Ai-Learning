<<<<<<< HEAD
# OpenAI API Setup Guide

## Step 1: Get Your OpenAI API Key

1. **Visit OpenAI Platform:**
   - Go to [https://platform.openai.com/](https://platform.openai.com/)
   - Sign up or log in to your account

2. **Create API Key:**
   - Navigate to "API Keys" section
   - Click "Create new secret key"
   - Give it a name (e.g., "SaaS Learning Platform")
   - Copy the generated key (starts with `sk-`)

## Step 2: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
   ```bash
   # Create the file
   touch .env.local
   ```

2. **Add your OpenAI API key** to `.env.local`:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=sk-your_actual_api_key_here
   
   # NextAuth Configuration (Optional)
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # Optional: Authentication Providers
   # GOOGLE_CLIENT_ID=your_google_client_id
   # GOOGLE_CLIENT_SECRET=your_google_client_secret
   # GITHUB_CLIENT_ID=your_github_client_id
   # GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

## Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Step 4: Test AI Code Generation

1. **Navigate to your app:** http://localhost:3001
2. **Go to AI Code Generator section**
3. **Select a language** (JavaScript, Python, etc.)
4. **Enter a topic** (e.g., "Async/Await", "React Hooks")
5. **Choose difficulty** (Beginner, Intermediate, Advanced)
6. **Click "Generate Code"**

## Features Available with OpenAI

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

## API Endpoints Using OpenAI

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

## Troubleshooting

### Common Issues:

1. **"OpenAI API key not configured"**
   - Ensure `.env.local` file exists in project root
   - Check that `OPENAI_API_KEY` is set correctly
   - Restart the development server

2. **"Failed to generate code"**
   - Verify your API key is valid
   - Check your OpenAI account has sufficient credits
   - Ensure stable internet connection

3. **"Rate limit exceeded"**
   - OpenAI has rate limits for free accounts
   - Consider upgrading to a paid plan for higher limits

4. **"Invalid API key"**
   - Double-check the API key format (starts with `sk-`)
   - Ensure no extra spaces or characters

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Keep your API key secure**
3. **Monitor your OpenAI usage** to avoid unexpected charges
4. **Use environment variables** for all sensitive data

## Cost Management

- **Free Tier:** $5 credit for new users
- **Pay-as-you-go:** $0.002 per 1K tokens (GPT-3.5)
- **Monitor usage** in OpenAI dashboard
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

## Next Steps

1. **Test the AI features** with your API key
2. **Explore different topics** and languages
3. **Customize the prompts** in the API routes if needed
4. **Add more learning content** to your platform

=======
# OpenAI API Setup Guide

## Step 1: Get Your OpenAI API Key

1. **Visit OpenAI Platform:**
   - Go to [https://platform.openai.com/](https://platform.openai.com/)
   - Sign up or log in to your account

2. **Create API Key:**
   - Navigate to "API Keys" section
   - Click "Create new secret key"
   - Give it a name (e.g., "SaaS Learning Platform")
   - Copy the generated key (starts with `sk-`)

## Step 2: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
   ```bash
   # Create the file
   touch .env.local
   ```

2. **Add your OpenAI API key** to `.env.local`:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=sk-your_actual_api_key_here
   
   # NextAuth Configuration (Optional)
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # Optional: Authentication Providers
   # GOOGLE_CLIENT_ID=your_google_client_id
   # GOOGLE_CLIENT_SECRET=your_google_client_secret
   # GITHUB_CLIENT_ID=your_github_client_id
   # GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

## Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Step 4: Test AI Code Generation

1. **Navigate to your app:** http://localhost:3001
2. **Go to AI Code Generator section**
3. **Select a language** (JavaScript, Python, etc.)
4. **Enter a topic** (e.g., "Async/Await", "React Hooks")
5. **Choose difficulty** (Beginner, Intermediate, Advanced)
6. **Click "Generate Code"**

## Features Available with OpenAI

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

## API Endpoints Using OpenAI

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

## Troubleshooting

### Common Issues:

1. **"OpenAI API key not configured"**
   - Ensure `.env.local` file exists in project root
   - Check that `OPENAI_API_KEY` is set correctly
   - Restart the development server

2. **"Failed to generate code"**
   - Verify your API key is valid
   - Check your OpenAI account has sufficient credits
   - Ensure stable internet connection

3. **"Rate limit exceeded"**
   - OpenAI has rate limits for free accounts
   - Consider upgrading to a paid plan for higher limits

4. **"Invalid API key"**
   - Double-check the API key format (starts with `sk-`)
   - Ensure no extra spaces or characters

## Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Keep your API key secure**
3. **Monitor your OpenAI usage** to avoid unexpected charges
4. **Use environment variables** for all sensitive data

## Cost Management

- **Free Tier:** $5 credit for new users
- **Pay-as-you-go:** $0.002 per 1K tokens (GPT-3.5)
- **Monitor usage** in OpenAI dashboard
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

## Next Steps

1. **Test the AI features** with your API key
2. **Explore different topics** and languages
3. **Customize the prompts** in the API routes if needed
4. **Add more learning content** to your platform

>>>>>>> 7d750ccee6fd67ca93708119191613680de06a01
Your SaaS learning platform is now ready with full AI capabilities! 🚀 