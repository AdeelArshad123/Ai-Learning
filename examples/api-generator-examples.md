# AI API Generator Examples

This document provides practical examples of using the AI API Generator to create various types of APIs.

## Example 1: Todo Application API

### Description
```
I need a REST API for a todo application with user authentication. Users should be able to create, read, update, and delete todos. Each todo has a title, description, due date, priority level, and completion status. Include user registration and login functionality.
```

### Configuration
- **Languages**: Python (FastAPI), JavaScript (Express)
- **Authentication**: JWT
- **Database**: MongoDB
- **Complexity**: Moderate
- **Include Tests**: Yes
- **Include Documentation**: Yes

### Generated Endpoints
```
POST /auth/register     - User registration
POST /auth/login        - User login
GET /todos              - Get all user todos
POST /todos             - Create new todo
GET /todos/:id          - Get specific todo
PUT /todos/:id          - Update todo
DELETE /todos/:id       - Delete todo
```

## Example 2: E-commerce Product API

### Description
```
Create an e-commerce API for managing products, categories, and inventory. Include product search, filtering by category and price range, inventory tracking, and basic order management. Support product images and reviews.
```

### Configuration
- **Languages**: Java (Spring Boot), C# (ASP.NET Core)
- **Authentication**: OAuth 2.0
- **Database**: PostgreSQL
- **Complexity**: Complex
- **Include Tests**: Yes
- **Include Documentation**: Yes

### Generated Endpoints
```
GET /products           - List products with filtering
POST /products          - Create new product
GET /products/:id       - Get product details
PUT /products/:id       - Update product
DELETE /products/:id    - Delete product
GET /categories         - List categories
POST /categories        - Create category
GET /products/search    - Search products
POST /orders            - Create order
GET /orders/:id         - Get order details
```

## Example 3: Blog API

### Description
```
Build a blogging platform API with posts, comments, and user management. Users can create, edit, and delete their posts. Other users can comment on posts. Include post categories, tags, and search functionality.
```

### Configuration
- **Languages**: TypeScript (Express), Ruby (Rails)
- **Authentication**: API Key
- **Database**: MySQL
- **Complexity**: Moderate
- **Include Tests**: Yes
- **Include Documentation**: Yes

### Generated Endpoints
```
GET /posts              - List all posts
POST /posts             - Create new post
GET /posts/:id          - Get post details
PUT /posts/:id          - Update post
DELETE /posts/:id       - Delete post
POST /posts/:id/comments - Add comment
GET /posts/:id/comments  - Get post comments
GET /users              - List users
POST /users             - Create user
```

## Example 4: Simple File Storage API

### Description
```
Create a file storage API that allows users to upload, download, and manage files. Include file metadata, folder organization, and sharing capabilities. Support different file types and size limits.
```

### Configuration
- **Languages**: Go (Gin), Rust (Actix-web)
- **Authentication**: Basic Auth
- **Database**: SQLite
- **Complexity**: Simple
- **Include Tests**: No
- **Include Documentation**: Yes

### Generated Endpoints
```
POST /files             - Upload file
GET /files              - List user files
GET /files/:id          - Download file
DELETE /files/:id       - Delete file
POST /folders           - Create folder
GET /folders            - List folders
PUT /files/:id/share    - Share file
```

## Example 5: Public Weather API

### Description
```
Build a public weather API that provides current weather data and forecasts. No authentication required. Include endpoints for current weather, 5-day forecast, and weather alerts by location.
```

### Configuration
- **Languages**: PHP (Laravel), Python (Flask)
- **Authentication**: None
- **Database**: None (external data source)
- **Complexity**: Simple
- **Include Tests**: Yes
- **Include Documentation**: Yes

### Generated Endpoints
```
GET /weather/current    - Current weather by location
GET /weather/forecast   - 5-day forecast
GET /weather/alerts     - Weather alerts
GET /locations/search   - Search locations
```

## Testing Generated APIs

### Using cURL
```bash
# Test todo API
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "Learn AI API Generator", "description": "Complete the tutorial", "dueDate": "2024-12-31"}'
```

### Using JavaScript/Node.js
```javascript
// Test e-commerce API
const response = await fetch('http://localhost:8080/products', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_OAUTH_TOKEN',
    'Content-Type': 'application/json'
  }
});

const products = await response.json();
console.log(products);

// Create new product
const newProduct = await fetch('http://localhost:8080/products', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_OAUTH_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Awesome Product',
    description: 'This is an awesome product',
    price: 29.99,
    category: 'electronics'
  })
});
```

### Using Python
```python
import requests

# Test blog API
headers = {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
}

# Get all posts
response = requests.get('http://localhost:5000/posts', headers=headers)
posts = response.json()
print(posts)

# Create new post
new_post = {
    'title': 'My First Blog Post',
    'content': 'This is the content of my first blog post.',
    'tags': ['tutorial', 'api']
}

response = requests.post('http://localhost:5000/posts', 
                        json=new_post, 
                        headers=headers)
created_post = response.json()
print(created_post)
```

## Customization Tips

### 1. Environment Variables
Always configure environment variables for:
```bash
# Database connection
DATABASE_URL=mongodb://localhost:27017/myapp
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp

# Authentication
JWT_SECRET=your-super-secret-key
OAUTH_CLIENT_ID=your-oauth-client-id
OAUTH_CLIENT_SECRET=your-oauth-client-secret

# API Configuration
PORT=3000
NODE_ENV=development
API_VERSION=v1
```

### 2. Adding Custom Middleware
```javascript
// Add rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. Enhanced Error Handling
```python
# Python/FastAPI example
from fastapi import HTTPException

@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": f"Invalid value: {str(exc)}"}
    )
```

### 4. Adding Logging
```java
// Java/Spring Boot example
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        logger.info("Fetching all products");
        // ... implementation
    }
}
```

## Deployment Examples

### Docker Deployment
```dockerfile
# Python/FastAPI
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Heroku Deployment
```json
{
  "name": "my-generated-api",
  "description": "API generated by AI API Generator",
  "image": "heroku/nodejs",
  "addons": ["heroku-postgresql:hobby-dev"],
  "env": {
    "NODE_ENV": "production",
    "JWT_SECRET": {
      "generator": "secret"
    }
  }
}
```

### AWS Lambda Deployment
```javascript
// serverless.yml
service: my-api

provider:
  name: aws
  runtime: nodejs18.x
  environment:
    DATABASE_URL: ${env:DATABASE_URL}
    JWT_SECRET: ${env:JWT_SECRET}

functions:
  api:
    handler: handler.server
    events:
      - http:
          path: /{proxy+}
          method: ANY
```

## Best Practices

1. **Always review generated code** before deploying to production
2. **Add proper input validation** for all endpoints
3. **Implement comprehensive logging** for debugging and monitoring
4. **Set up proper error handling** for all edge cases
5. **Use environment variables** for all configuration
6. **Add rate limiting** to prevent abuse
7. **Implement proper CORS** settings for web applications
8. **Add API versioning** for future compatibility
9. **Write comprehensive tests** for all endpoints
10. **Document your API** thoroughly for other developers
