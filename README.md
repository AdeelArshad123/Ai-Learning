# AI CodeLearner - SaaS Learning Platform

A modern, AI-powered learning platform for programmers and beginners to learn the latest coding trends, languages, and tools.

## ✨ Features

- 🤖 **AI Code Generation** - Get AI-powered code examples with explanations
- 🎯 **Interactive Quizzes** - Test your knowledge with adaptive quizzes
- 📈 **Progress Tracking** - Monitor your learning journey with analytics
- 🔍 **Smart Search** - Search across topics, tools, and channels
- 🌙 **Dark/Light Mode** - Beautiful UI with theme toggle
- 📱 **Responsive Design** - Works on all devices
- 🔐 **User Authentication** - Secure login with NextAuth
- 📊 **Learning Analytics** - Track your performance and insights

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **AI:** OpenAI GPT-4 for code generation and quizzes
- **Authentication:** NextAuth.js
- **Database:** MongoDB (ready for production)
- **Editor:** Monaco Editor for code examples

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/AdeelArshad123/Ai-Codelearner.git
cd Ai-Codelearner
npm install
```

### 2. Set Up OpenAI API

```bash
# Run the setup script
npm run setup

# Edit .env.local and add your OpenAI API key
# Get your API key from: https://platform.openai.com/api-keys
```

### 3. Test OpenAI Configuration

```bash
npm run test-openai
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 🔑 OpenAI API Setup

### Step 1: Get API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to "API Keys" section
4. Create a new secret key
5. Copy the key (starts with `sk-`)

### Step 2: Configure Environment
1. Edit `.env.local` file in your project root
2. Replace `your_openai_api_key_here` with your actual API key:

```env
OPENAI_API_KEY=sk-your_actual_api_key_here
```

### Step 3: Test Configuration
```bash
npm run test-openai
```

## 🎯 Available Features

### AI Code Generation
- **13+ Programming Languages:** JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, Dart
- **Smart Explanations:** Beginner-friendly explanations with code
- **Key Learning Points:** Extracted learning objectives
- **Difficulty Levels:** Beginner, Intermediate, Advanced

### Interactive Quizzes
- **AI-Generated Questions:** Dynamic quizzes for any topic
- **Adaptive Difficulty:** Questions adjust based on performance
- **Detailed Explanations:** Learn from correct answers
- **Progress Tracking:** Monitor your quiz performance

### Learning Analytics
- **Progress Tracking:** Monitor completed topics and quizzes
- **Performance Insights:** Get personalized learning recommendations
- **Achievement System:** Unlock badges and achievements
- **Learning Streaks:** Track your daily learning habits

### Trending Tools
- **GitHub Integration:** Discover trending repositories
- **Tool Categories:** Filter by programming language and type
- **Real-time Updates:** Get the latest trending tools

### YouTube Channels
- **Curated Content:** Top programming YouTube channels
- **Language Filtering:** Find channels for specific languages
- **Learning Paths:** Structured learning recommendations

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── generate-code/ # AI code generation
│   │   ├── generate-quiz/ # AI quiz generation
│   │   ├── user-progress/ # User progress tracking
│   │   ├── analytics/     # Learning analytics
│   │   ├── search/        # Global search
│   │   └── notifications/ # Notification system
│   ├── globals.css        # Global styles
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AICodeGenerator.tsx
│   ├── Dashboard.tsx
│   ├── ProgressTracker.tsx
│   ├── SearchBar.tsx
│   └── ...
└── lib/                  # Utility functions
    └── auth.ts           # Authentication configuration
```

## 🔧 API Endpoints

### AI Features
- `POST /api/generate-code` - Generate AI-powered code examples
- `POST /api/generate-quiz` - Create adaptive quizzes

### User Management
- `GET/POST /api/user-progress` - Track learning progress
- `GET/PUT /api/user-profile` - Manage user profiles
- `GET/POST /api/analytics` - Learning analytics

### Content
- `GET /api/get-trending` - Trending GitHub repositories
- `GET /api/get-youtube-channels` - Programming YouTube channels
- `GET /api/learning-topics` - Educational content
- `GET /api/search` - Global search functionality

### Notifications
- `GET/POST/PUT /api/notifications` - Notification system

## 🎨 Customization

### Adding New Languages
Edit `src/app/api/generate-code/route.ts` to add more programming languages.

### Customizing AI Prompts
Modify the prompt templates in the API routes for different AI behaviors.

### Styling
The app uses Tailwind CSS. Customize colors in `tailwind.config.js`.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
```env
OPENAI_API_KEY=your_production_api_key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret
MONGODB_URI=your_mongodb_connection_string
```

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ API key validation
- ✅ Rate limiting (implement as needed)
- ✅ Input sanitization
- ✅ Error handling

## 💰 Cost Management

### OpenAI Costs
- **Free Tier:** $5 credit for new users
- **Pay-as-you-go:** $0.002 per 1K tokens (GPT-3.5)
- **Monitor usage** in OpenAI dashboard
- **Set spending limits** to control costs

### Tips to Reduce Costs
1. Use GPT-3.5-turbo for most operations
2. Implement caching for repeated requests
3. Set reasonable token limits
4. Monitor usage regularly

## 🐛 Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Check `.env.local` file exists
   - Verify `OPENAI_API_KEY` is set correctly
   - Restart development server

2. **"Failed to generate code"**
   - Verify API key is valid
   - Check OpenAI account has sufficient credits
   - Ensure stable internet connection

3. **Build errors**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check Node.js version compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the beautiful styling
- All contributors and users

---

**Happy Learning! 🎉**

Your AI CodeLearner Platform is ready to help developers learn and grow! 🚀
