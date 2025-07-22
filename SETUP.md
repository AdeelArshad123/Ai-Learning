<<<<<<< HEAD
# AI Code Generation Setup

## OpenAI API Configuration

To enable AI code generation, you need to set up your OpenAI API key:

1. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to "API Keys" section
   - Create a new API key

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory with:
   ```
OPENAI_API_KEY=APIsk-proj-9lpMfwzS6L45nW399KFoAkl89dJNJaTxSt7u1VvtCcDUXQofVleiVNiPLo2M-x_1qzpmEC8vVFT3BlbkFJafVaBD0i-s0EiaWeJuZDJwPZnLhK4IRzm4HnmY_6hA-OIfkviUNQtNxGyOC3amG9eDlLSomDwA   ```

3. **Restart the Development Server:**
   ```bash
   npm run dev
   ```

## Features

### Enhanced AI Code Generator
- **Multiple Languages:** JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, Dart
- **Difficulty Levels:** Beginner, Intermediate, Advanced
- **Smart Prompts:** Context-aware code generation with explanations
- **Key Learning Points:** Extracted learning objectives from generated code
- **Copy & Download:** Easy code sharing and file download
- **Syntax Highlighting:** Proper code formatting and display

### API Endpoints
- `POST /api/generate-code` - Generate code with OpenAI
- `GET /api/generate-code` - Get available languages, topics, and difficulties

### Error Handling
- Comprehensive error handling for API failures
- User-friendly error messages
- Fallback responses for malformed API responses

## Usage

1. **Select Language:** Choose from 13+ programming languages
2. **Enter Topic:** Describe the concept you want to learn (e.g., "Async/Await", "React Hooks")
3. **Choose Difficulty:** Select beginner, intermediate, or advanced level
4. **Generate Code:** Click the generate button to create AI-powered code examples
5. **Review Results:** Get code, explanations, and key learning points
6. **Copy/Download:** Share or save the generated code

## Example Topics

- Variables and Data Types
- Control Structures (if/else, loops)
- Functions and Methods
- Object-Oriented Programming
- Error Handling
- Async Programming
- File I/O Operations
- Database Operations
- API Integration
- Testing
- Design Patterns
- Data Structures
- Algorithms
- Web Development
- Mobile Development
- Machine Learning
- DevOps and Deployment

## Troubleshooting

### Common Issues:

1. **"OpenAI API key not configured"**
   - Ensure you've created `.env.local` with your API key
   - Restart the development server

2. **"Failed to generate code"**
   - Check your internet connection
   - Verify your OpenAI API key is valid
   - Ensure you have sufficient OpenAI credits

3. **Slow generation**
   - This is normal for complex topics
   - The system uses GPT-4 for high-quality results

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your OpenAI API key secure
=======
# AI Code Generation Setup

## OpenAI API Configuration

To enable AI code generation, you need to set up your OpenAI API key:

1. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in to your account
   - Navigate to "API Keys" section
   - Create a new API key

2. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory with:
   ```
OPENAI_API_KEY=APIsk-proj-9lpMfwzS6L45nW399KFoAkl89dJNJaTxSt7u1VvtCcDUXQofVleiVNiPLo2M-x_1qzpmEC8vVFT3BlbkFJafVaBD0i-s0EiaWeJuZDJwPZnLhK4IRzm4HnmY_6hA-OIfkviUNQtNxGyOC3amG9eDlLSomDwA   ```

3. **Restart the Development Server:**
   ```bash
   npm run dev
   ```

## Features

### Enhanced AI Code Generator
- **Multiple Languages:** JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, Dart
- **Difficulty Levels:** Beginner, Intermediate, Advanced
- **Smart Prompts:** Context-aware code generation with explanations
- **Key Learning Points:** Extracted learning objectives from generated code
- **Copy & Download:** Easy code sharing and file download
- **Syntax Highlighting:** Proper code formatting and display

### API Endpoints
- `POST /api/generate-code` - Generate code with OpenAI
- `GET /api/generate-code` - Get available languages, topics, and difficulties

### Error Handling
- Comprehensive error handling for API failures
- User-friendly error messages
- Fallback responses for malformed API responses

## Usage

1. **Select Language:** Choose from 13+ programming languages
2. **Enter Topic:** Describe the concept you want to learn (e.g., "Async/Await", "React Hooks")
3. **Choose Difficulty:** Select beginner, intermediate, or advanced level
4. **Generate Code:** Click the generate button to create AI-powered code examples
5. **Review Results:** Get code, explanations, and key learning points
6. **Copy/Download:** Share or save the generated code

## Example Topics

- Variables and Data Types
- Control Structures (if/else, loops)
- Functions and Methods
- Object-Oriented Programming
- Error Handling
- Async Programming
- File I/O Operations
- Database Operations
- API Integration
- Testing
- Design Patterns
- Data Structures
- Algorithms
- Web Development
- Mobile Development
- Machine Learning
- DevOps and Deployment

## Troubleshooting

### Common Issues:

1. **"OpenAI API key not configured"**
   - Ensure you've created `.env.local` with your API key
   - Restart the development server

2. **"Failed to generate code"**
   - Check your internet connection
   - Verify your OpenAI API key is valid
   - Ensure you have sufficient OpenAI credits

3. **Slow generation**
   - This is normal for complex topics
   - The system uses GPT-4 for high-quality results

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your OpenAI API key secure
>>>>>>> 7d750ccee6fd67ca93708119191613680de06a01
- Monitor your OpenAI usage to avoid unexpected charges 