// 🤖 AI Code Generation Engine
// Generates production-ready API code in multiple programming languages

interface CodeGenerationOptions {
  authType: string
  database?: string
  complexity: string
  includeTests: boolean
  includeDocs: boolean
}

interface GeneratedFile {
  path: string
  content: string
  type: 'code' | 'config' | 'documentation' | 'test'
}

// 🚀 Main application file generators
export async function generateMainApplicationFile(
  language: string,
  framework: string,
  architecture: any,
  options: CodeGenerationOptions
): Promise<GeneratedFile> {
  const prompt = `
Generate a main application file for a ${language} ${framework} API with the following specifications:

Architecture: ${JSON.stringify(architecture, null, 2)}
Options: ${JSON.stringify(options, null, 2)}

Requirements:
1. Set up the web server
2. Configure middleware (CORS, body parsing, error handling)
3. Set up authentication if required
4. Configure database connection if specified
5. Set up routes
6. Include proper error handling
7. Follow ${language} best practices
8. Include comments explaining the code

Generate only the code, no explanations.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: `You are an expert ${language} developer. Generate clean, production-ready code following best practices.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    return {
      path: getMainFileName(language, framework),
      content: cleanCodeContent(content),
      type: 'code'
    }

  } catch (error) {
    console.error('Error generating main file:', error)
    return generateFallbackMainFile(language, framework, architecture, options)
  }
}

// 🗃️ Model file generators
export async function generateModelFile(
  language: string,
  framework: string,
  entity: string,
  options: CodeGenerationOptions
): Promise<GeneratedFile> {
  const prompt = `
Generate a data model/entity class for "${entity}" in ${language} using ${framework}.

Requirements:
1. Include common fields (id, createdAt, updatedAt)
2. Add entity-specific fields based on the name
3. Include validation rules
4. Add database schema/migration if applicable
5. Include proper typing/interfaces
6. Follow ${language} naming conventions
7. Add comments explaining the model

Generate only the code, no explanations.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: `You are an expert ${language} developer. Generate clean data models following best practices.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1500
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    return {
      path: getModelFileName(language, framework, entity),
      content: cleanCodeContent(content),
      type: 'code'
    }

  } catch (error) {
    console.error('Error generating model file:', error)
    return generateFallbackModelFile(language, framework, entity, options)
  }
}

// 🛣️ Route file generators
export async function generateRouteFile(
  language: string,
  framework: string,
  endpoint: any,
  options: CodeGenerationOptions
): Promise<GeneratedFile> {
  const prompt = `
Generate a route handler for the following endpoint in ${language} using ${framework}:

Endpoint: ${endpoint.method} ${endpoint.path}
Description: ${endpoint.description}

Requirements:
1. Implement the HTTP method handler
2. Add input validation
3. Include error handling
4. Add authentication middleware if needed
5. Implement the business logic
6. Return proper HTTP status codes
7. Follow RESTful conventions
8. Add comments explaining the logic

Generate only the code, no explanations.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: `You are an expert ${language} developer. Generate clean route handlers following REST API best practices.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 1500
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    return {
      path: getRouteFileName(language, framework, endpoint),
      content: cleanCodeContent(content),
      type: 'code'
    }

  } catch (error) {
    console.error('Error generating route file:', error)
    return generateFallbackRouteFile(language, framework, endpoint, options)
  }
}

// 🔐 Authentication middleware generators
export async function generateAuthMiddleware(
  language: string,
  framework: string,
  authType: string
): Promise<GeneratedFile> {
  const prompt = `
Generate authentication middleware for ${authType} in ${language} using ${framework}.

Requirements:
1. Implement ${authType} authentication
2. Add token validation
3. Include error handling for invalid tokens
4. Add user context to requests
5. Include rate limiting if applicable
6. Follow security best practices
7. Add proper logging
8. Include comments explaining the authentication flow

Generate only the code, no explanations.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: `You are a security expert and ${language} developer. Generate secure authentication middleware.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    return {
      path: getAuthFileName(language, framework),
      content: cleanCodeContent(content),
      type: 'code'
    }

  } catch (error) {
    console.error('Error generating auth middleware:', error)
    return generateFallbackAuthFile(language, framework, authType)
  }
}

// 🔧 Helper functions
function getMainFileName(language: string, framework: string): string {
  const fileNames = {
    python: 'main.py',
    javascript: 'server.js',
    typescript: 'server.ts',
    java: 'Application.java',
    csharp: 'Program.cs',
    go: 'main.go',
    ruby: 'app.rb',
    php: 'index.php',
    rust: 'main.rs'
  }
  return fileNames[language as keyof typeof fileNames] || 'main.js'
}

function getModelFileName(language: string, framework: string, entity: string): string {
  const extensions = {
    python: '.py',
    javascript: '.js',
    typescript: '.ts',
    java: '.java',
    csharp: '.cs',
    go: '.go',
    ruby: '.rb',
    php: '.php',
    rust: '.rs'
  }
  const ext = extensions[language as keyof typeof extensions] || '.js'
  return `models/${entity}${ext}`
}

function getRouteFileName(language: string, framework: string, endpoint: any): string {
  const extensions = {
    python: '.py',
    javascript: '.js',
    typescript: '.ts',
    java: '.java',
    csharp: '.cs',
    go: '.go',
    ruby: '.rb',
    php: '.php',
    rust: '.rs'
  }
  const ext = extensions[language as keyof typeof extensions] || '.js'
  const routeName = endpoint.path.split('/')[1] || 'routes'
  return `routes/${routeName}${ext}`
}

function getAuthFileName(language: string, framework: string): string {
  const extensions = {
    python: '.py',
    javascript: '.js',
    typescript: '.ts',
    java: '.java',
    csharp: '.cs',
    go: '.go',
    ruby: '.rb',
    php: '.php',
    rust: '.rs'
  }
  const ext = extensions[language as keyof typeof extensions] || '.js'
  return `middleware/auth${ext}`
}

function cleanCodeContent(content: string): string {
  // Remove markdown code blocks if present
  return content
    .replace(/```[\w]*\n/g, '')
    .replace(/```/g, '')
    .trim()
}

// 📁 Configuration file generators
export async function generateConfigFiles(
  language: string,
  framework: string,
  options: CodeGenerationOptions
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = []

  // Package/dependency file
  const packageFile = await generatePackageFile(language, framework, options)
  files.push(packageFile)

  // Environment configuration
  const envFile = generateEnvironmentFile(language, framework, options)
  files.push(envFile)

  // Database configuration if needed
  if (options.database && options.database !== 'none') {
    const dbConfigFile = generateDatabaseConfigFile(language, framework, options.database)
    files.push(dbConfigFile)
  }

  return files
}

// 🧪 Test file generators
export async function generateTestFiles(
  language: string,
  framework: string,
  architecture: any,
  options: CodeGenerationOptions
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = []

  // Generate test for each endpoint
  for (const endpoint of architecture.endpoints) {
    const testFile = await generateEndpointTest(language, framework, endpoint, options)
    files.push(testFile)
  }

  // Generate integration tests
  const integrationTest = await generateIntegrationTest(language, framework, architecture, options)
  files.push(integrationTest)

  return files
}

// 📚 Documentation generators
export async function generateAPIDocumentation(
  language: string,
  framework: string,
  architecture: any,
  requirements: any
): Promise<string> {
  const prompt = `
Generate comprehensive README documentation for a ${language} ${framework} API:

Architecture: ${JSON.stringify(architecture, null, 2)}
Requirements: ${JSON.stringify(requirements, null, 2)}

Include:
1. Project overview
2. Installation instructions
3. Configuration setup
4. API endpoints documentation
5. Authentication guide
6. Database setup
7. Running tests
8. Deployment instructions
9. Contributing guidelines

Format as Markdown.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: 'You are a technical writer. Create clear, comprehensive API documentation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 3000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || generateFallbackDocumentation(language, framework, architecture)

  } catch (error) {
    console.error('Error generating documentation:', error)
    return generateFallbackDocumentation(language, framework, architecture)
  }
}

// 💡 Usage example generators
export async function generateUsageExamples(
  language: string,
  framework: string,
  endpoints: any[]
): Promise<string[]> {
  const examples: string[] = []

  for (const endpoint of endpoints.slice(0, 5)) { // Limit to first 5 endpoints
    const example = await generateEndpointExample(language, framework, endpoint)
    examples.push(example)
  }

  return examples
}

// 🚀 Deployment instruction generators
export async function generateDeploymentInstructions(
  language: string,
  framework: string,
  options: CodeGenerationOptions
): Promise<string> {
  const prompt = `
Generate deployment instructions for a ${language} ${framework} API:

Options: ${JSON.stringify(options, null, 2)}

Include instructions for:
1. Local development setup
2. Production deployment (Docker, cloud platforms)
3. Environment variables configuration
4. Database setup and migrations
5. SSL/HTTPS configuration
6. Monitoring and logging
7. Scaling considerations

Format as Markdown.
`

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-coder',
        messages: [
          {
            role: 'system',
            content: 'You are a DevOps expert. Create clear deployment instructions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || generateFallbackDeploymentInstructions(language, framework)

  } catch (error) {
    console.error('Error generating deployment instructions:', error)
    return generateFallbackDeploymentInstructions(language, framework)
  }
}

// 🔄 Fallback generators for when AI fails
function generateFallbackMainFile(
  language: string,
  framework: string,
  architecture: any,
  options: CodeGenerationOptions
): GeneratedFile {
  const templates = {
    javascript: `// Express.js API Server
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    python: `# FastAPI Application
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Generated API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`
  }

  return {
    path: getMainFileName(language, framework),
    content: templates[language as keyof typeof templates] || templates.javascript,
    type: 'code'
  }
}

function generateFallbackModelFile(
  language: string,
  framework: string,
  entity: string,
  options: CodeGenerationOptions
): GeneratedFile {
  const templates = {
    javascript: `// ${entity} Model
class ${entity.charAt(0).toUpperCase() + entity.slice(1)} {
  constructor(data) {
    this.id = data.id || null;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

module.exports = ${entity.charAt(0).toUpperCase() + entity.slice(1)};`,
    python: `# ${entity} Model
from datetime import datetime
from typing import Optional

class ${entity.charAt(0).toUpperCase() + entity.slice(1)}:
    def __init__(self, id: Optional[str] = None, created_at: Optional[datetime] = None, updated_at: Optional[datetime] = None):
        self.id = id
        self.created_at = created_at or datetime.now()
        self.updated_at = updated_at or datetime.now()`
  }

  return {
    path: getModelFileName(language, framework, entity),
    content: templates[language as keyof typeof templates] || templates.javascript,
    type: 'code'
  }
}

function generateFallbackRouteFile(
  language: string,
  framework: string,
  endpoint: any,
  options: CodeGenerationOptions
): GeneratedFile {
  const method = endpoint.method.toLowerCase()
  const path = endpoint.path

  const templates = {
    javascript: `// ${endpoint.description}
const express = require('express');
const router = express.Router();

router.${method}('${path}', async (req, res) => {
  try {
    // TODO: Implement ${endpoint.description}
    res.json({ message: '${endpoint.description} - Not implemented yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;`,
    python: `# ${endpoint.description}
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.${method}("${path}")
async def ${method}_${path.replace('/', '_').replace(':', '')}():
    try:
        # TODO: Implement ${endpoint.description}
        return {"message": "${endpoint.description} - Not implemented yet"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`
  }

  return {
    path: getRouteFileName(language, framework, endpoint),
    content: templates[language as keyof typeof templates] || templates.javascript,
    type: 'code'
  }
}

function generateFallbackAuthFile(
  language: string,
  framework: string,
  authType: string
): GeneratedFile {
  const templates = {
    javascript: `// ${authType.toUpperCase()} Authentication Middleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };`,
    python: `# ${authType.toUpperCase()} Authentication Middleware
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os

security = HTTPBearer()

async def authenticate_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, os.getenv('JWT_SECRET'), algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")`
  }

  return {
    path: getAuthFileName(language, framework),
    content: templates[language as keyof typeof templates] || templates.javascript,
    type: 'code'
  }
}

async function generatePackageFile(
  language: string,
  framework: string,
  options: CodeGenerationOptions
): Promise<GeneratedFile> {
  const templates = {
    javascript: {
      path: 'package.json',
      content: JSON.stringify({
        name: 'generated-api',
        version: '1.0.0',
        description: 'AI-generated API',
        main: 'server.js',
        scripts: {
          start: 'node server.js',
          dev: 'nodemon server.js',
          test: 'jest'
        },
        dependencies: {
          express: '^4.18.0',
          cors: '^2.8.5',
          ...(options.authType === 'jwt' && { jsonwebtoken: '^9.0.0' }),
          ...(options.database === 'mongodb' && { mongoose: '^7.0.0' })
        },
        devDependencies: {
          nodemon: '^2.0.0',
          jest: '^29.0.0'
        }
      }, null, 2)
    },
    python: {
      path: 'requirements.txt',
      content: [
        'fastapi>=0.100.0',
        'uvicorn>=0.22.0',
        ...(options.authType === 'jwt' ? ['pyjwt>=2.8.0'] : []),
        ...(options.database === 'mongodb' ? ['pymongo>=4.4.0'] : []),
        ...(options.includeTests ? ['pytest>=7.4.0'] : [])
      ].join('\n')
    }
  }

  const template = templates[language as keyof typeof templates]
  return {
    path: template?.path || 'package.json',
    content: template?.content || '{}',
    type: 'config'
  }
}

function generateEnvironmentFile(
  language: string,
  framework: string,
  options: CodeGenerationOptions
): GeneratedFile {
  const envVars = [
    'PORT=3000',
    ...(options.authType === 'jwt' ? ['JWT_SECRET=your-secret-key'] : []),
    ...(options.database === 'mongodb' ? ['MONGODB_URI=mongodb://localhost:27017/api'] : []),
    ...(options.database === 'postgresql' ? ['DATABASE_URL=postgresql://user:password@localhost:5432/api'] : [])
  ]

  return {
    path: '.env.example',
    content: envVars.join('\n'),
    type: 'config'
  }
}

function generateDatabaseConfigFile(
  language: string,
  framework: string,
  database: string
): GeneratedFile {
  const templates = {
    javascript: {
      mongodb: `// MongoDB Configuration
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;`
    },
    python: {
      mongodb: `# MongoDB Configuration
from pymongo import MongoClient
import os

def get_database():
    client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
    return client['api']

db = get_database()`
    }
  }

  const template = templates[language as keyof typeof templates]?.[database as keyof any]

  return {
    path: `config/database.${language === 'python' ? 'py' : 'js'}`,
    content: template || '// Database configuration',
    type: 'config'
  }
}

async function generateEndpointTest(
  language: string,
  framework: string,
  endpoint: any,
  options: CodeGenerationOptions
): Promise<GeneratedFile> {
  const method = endpoint.method.toLowerCase()
  const path = endpoint.path

  const templates = {
    javascript: `// Test for ${endpoint.description}
const request = require('supertest');
const app = require('../server');

describe('${endpoint.method} ${endpoint.path}', () => {
  test('should ${endpoint.description.toLowerCase()}', async () => {
    const response = await request(app)
      .${method}('${path}')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});`,
    python: `# Test for ${endpoint.description}
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_${method}_${path.replace('/', '_').replace(':', '')}():
    response = client.${method}("${path}")
    assert response.status_code == 200
    assert response.json() is not None`
  }

  return {
    path: `tests/${endpoint.path.split('/')[1] || 'api'}_test.${language === 'python' ? 'py' : 'js'}`,
    content: templates[language as keyof typeof templates] || templates.javascript,
    type: 'test'
  }
}

async function generateIntegrationTest(
  language: string,
  framework: string,
  architecture: any,
  options: CodeGenerationOptions
): Promise<GeneratedFile> {
  const templates = {
    javascript: `// Integration Tests
const request = require('supertest');
const app = require('../server');

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Setup test database
  });

  afterAll(async () => {
    // Cleanup test database
  });

  test('should start server successfully', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body.message).toBeDefined();
  });

  ${architecture.endpoints.slice(0, 3).map((endpoint: any) => `
  test('should handle ${endpoint.method} ${endpoint.path}', async () => {
    const response = await request(app)
      .${endpoint.method.toLowerCase()}('${endpoint.path}');

    expect(response.status).toBeLessThan(500);
  });`).join('')}
});`,
    python: `# Integration Tests
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

class TestAPIIntegration:
    def setup_method(self):
        # Setup test database
        pass

    def teardown_method(self):
        # Cleanup test database
        pass

    def test_server_health(self):
        response = client.get("/")
        assert response.status_code == 200
        assert "message" in response.json()

    ${architecture.endpoints.slice(0, 3).map((endpoint: any) => `
    def test_${endpoint.method.toLowerCase()}_${endpoint.path.replace('/', '_').replace(':', '')}(self):
        response = client.${endpoint.method.toLowerCase()}("${endpoint.path}")
        assert response.status_code < 500`).join('')}`
  }

  return {
    path: `tests/integration_test.${language === 'python' ? 'py' : 'js'}`,
    content: templates[language as keyof typeof templates] || templates.javascript,
    type: 'test'
  }
}

async function generateEndpointExample(
  language: string,
  framework: string,
  endpoint: any
): Promise<string> {
  const method = endpoint.method.toUpperCase()
  const path = endpoint.path

  return `
## ${endpoint.description}

**${method} ${path}**

\`\`\`bash
curl -X ${method} "http://localhost:3000${path}" \\
  -H "Content-Type: application/json" \\
  ${method !== 'GET' ? '-d \'{"key": "value"}\'' : ''}
\`\`\`

\`\`\`javascript
// JavaScript/Node.js example
const response = await fetch('http://localhost:3000${path}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },
  ${method !== 'GET' ? 'body: JSON.stringify({ key: "value" })' : ''}
});
const data = await response.json();
\`\`\`

\`\`\`python
# Python example
import requests

response = requests.${method.toLowerCase()}('http://localhost:3000${path}'${method !== 'GET' ? ', json={"key": "value"}' : ''})
data = response.json()
\`\`\`
`
}

function generateFallbackDocumentation(language: string, framework: string, architecture: any): string {
  return `
# ${language.charAt(0).toUpperCase() + language.slice(1)} ${framework.charAt(0).toUpperCase() + framework.slice(1)} API

## Overview
This is an AI-generated API built with ${language} and ${framework}.

## Installation

### ${language === 'javascript' ? 'Node.js' : 'Python'} Setup
\`\`\`bash
${language === 'javascript' ? 'npm install' : 'pip install -r requirements.txt'}
\`\`\`

## Configuration
Copy \`.env.example\` to \`.env\` and configure your environment variables.

## Running the API
\`\`\`bash
${language === 'javascript' ? 'npm start' : 'python main.py'}
\`\`\`

## API Endpoints
${architecture.endpoints.map((endpoint: any) => `
### ${endpoint.method} ${endpoint.path}
${endpoint.description}
`).join('')}

## Authentication
${architecture.authentication.type !== 'none' ? `This API uses ${architecture.authentication.type} authentication.` : 'No authentication required.'}

## Testing
\`\`\`bash
${language === 'javascript' ? 'npm test' : 'pytest'}
\`\`\`
`
}

function generateFallbackDeploymentInstructions(language: string, framework: string): string {
  return `
# Deployment Instructions

## Local Development
1. Install dependencies
2. Configure environment variables
3. Start the development server

## Production Deployment

### Docker
\`\`\`dockerfile
FROM ${language === 'javascript' ? 'node:18' : 'python:3.11'}
WORKDIR /app
COPY . .
${language === 'javascript' ? 'RUN npm install' : 'RUN pip install -r requirements.txt'}
EXPOSE ${language === 'javascript' ? '3000' : '8000'}
CMD ["${language === 'javascript' ? 'npm' : 'python'}", "${language === 'javascript' ? 'start' : 'main.py'}"]
\`\`\`

### Cloud Platforms
- **Heroku**: Push to Heroku Git repository
- **Vercel**: Connect GitHub repository
- **AWS**: Use Elastic Beanstalk or Lambda
- **Google Cloud**: Use App Engine or Cloud Run

## Environment Variables
Make sure to set all required environment variables in your production environment.
`
}
