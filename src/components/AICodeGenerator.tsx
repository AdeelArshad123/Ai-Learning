'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCode, FiCopy, FiDownload, FiPlay, FiRefreshCw, FiCheck, FiX, FiShare2, FiMessageSquare, FiBookOpen, FiZap } from 'react-icons/fi'
import { useNotifications } from './NotificationProvider'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import CodeShareModal from './CodeShareModal';

interface CodeResponse {
  code: string
  explanation: string
  keyPoints: string[]
  difficulty: string
  language: string
  topic: string
  comments?: string
}

interface AvailableOptions {
  languages: string[]
  topics: string[]
  difficulties: string[]
}

interface CodeTemplate {
  id: string
  name: string
  description: string
  language: string
  difficulty: string
  code: string
  category: string
}

const codeTemplates: CodeTemplate[] = [
  // JavaScript Templates
  {
    id: '1',
    name: 'Basic JavaScript Example',
    description: 'Simple JavaScript with console output',
    language: 'JavaScript',
    difficulty: 'beginner',
    category: 'Basics',
    code: `// Basic JavaScript example
console.log("Hello, World!");

const name = "CodeLearner";
const age = 25;
console.log(\`My name is \${name} and I am \${age} years old\`);

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Original numbers:", numbers);
console.log("Doubled numbers:", doubled);

// Object example
const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};
console.log("Person object:", person);`
  },
  {
    id: '2',
    name: 'Async/Await Pattern',
    description: 'Modern async/await pattern for API calls',
    language: 'JavaScript',
    difficulty: 'intermediate',
    category: 'Backend',
    code: `// Simulated API call
async function fetchUserData(userId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock user data
  const mockUser = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    age: 30
  };
  
  return mockUser;
}

// Usage
async function main() {
  try {
    console.log("Fetching user data...");
    const user = await fetchUserData(123);
    console.log("User data:", user);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();`
  },
  {
    id: '3',
    name: 'Array Methods',
    description: 'Common JavaScript array methods',
    language: 'JavaScript',
    difficulty: 'beginner',
    category: 'Data Structures',
    code: `// Array methods demonstration
const fruits = ["apple", "banana", "orange", "grape", "kiwi"];

console.log("Original array:", fruits);

// Filter fruits that start with 'a'
const aFruits = fruits.filter(fruit => fruit.startsWith('a'));
console.log("Fruits starting with 'a':", aFruits);

// Map to uppercase
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log("Uppercase fruits:", upperFruits);

// Find first fruit with more than 5 letters
const longFruit = fruits.find(fruit => fruit.length > 5);
console.log("First fruit with >5 letters:", longFruit);

// Reduce to count total letters
const totalLetters = fruits.reduce((sum, fruit) => sum + fruit.length, 0);
console.log("Total letters in all fruits:", totalLetters);`
  },
  {
    id: '4',
    name: 'Object Destructuring',
    description: 'Modern JavaScript object destructuring',
    language: 'JavaScript',
    difficulty: 'intermediate',
    category: 'ES6+',
    code: `// Object destructuring examples
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  preferences: {
    theme: "dark",
    language: "en"
  }
};

// Basic destructuring
const { name, email } = user;
console.log("Name:", name);
console.log("Email:", email);

// Destructuring with default values
const { age = 25, city = "Unknown" } = user;
console.log("Age (default):", age);
console.log("City (default):", city);

// Nested destructuring
const { preferences: { theme, language } } = user;
console.log("Theme:", theme);
console.log("Language:", language);

// Function with destructuring
function greetUser({ name, email }) {
  console.log(\`Hello \${name}! Your email is \${email}\`);
}

greetUser(user);`
  },
  {
    id: '5',
    name: 'React Functional Component',
    description: 'Modern React component with hooks',
    language: 'JavaScript',
    difficulty: 'intermediate',
    category: 'React',
    code: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default UserProfile;`
  },
  {
    id: '6',
    name: 'Express.js API Route',
    description: 'RESTful API endpoint with Express.js',
    language: 'JavaScript',
    difficulty: 'intermediate',
    category: 'Backend',
    code: `const express = require('express');
const router = express.Router();

// Middleware for validation
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    });
  }
  next();
};

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// POST create user
router.post('/users', validateUser, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;`
  },
  // Python Templates
  {
    id: '7',
    name: 'Python Data Classes',
    description: 'Using dataclasses for clean data structures',
    language: 'Python',
    difficulty: 'intermediate',
    category: 'Data Structures',
    code: `from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: datetime
    is_active: bool = True
    tags: List[str] = None

    def __post_init__(self):
        if self.tags is None:
            self.tags = []

    def add_tag(self, tag: str):
        self.tags.append(tag)

# Usage
user = User(
    id=1,
    name="John Doe",
    email="john@example.com",
    created_at=datetime.now()
)
user.add_tag("developer")
print(user)`
  },
  {
    id: '8',
    name: 'Python FastAPI Endpoint',
    description: 'Modern Python API with FastAPI',
    language: 'Python',
    difficulty: 'intermediate',
    category: 'Backend',
    code: `from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="User API", version="1.0.0")

class UserCreate(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

class User(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int] = None

# In-memory storage (use database in production)
users_db = []
user_id_counter = 1

@app.get("/users", response_model=List[User])
async def get_users():
    """Get all users"""
    return users_db

@app.post("/users", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    global user_id_counter
    new_user = User(
        id=user_id_counter,
        name=user.name,
        email=user.email,
        age=user.age
    )
    users_db.append(new_user)
    user_id_counter += 1
    return new_user

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get user by ID"""
    user = next((u for u in users_db if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
  },
  {
    id: '9',
    name: 'Python List Comprehensions',
    description: 'Advanced list comprehension examples',
    language: 'Python',
    difficulty: 'intermediate',
    category: 'Data Structures',
    code: `# Basic list comprehensions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Square all numbers
squares = [x**2 for x in numbers]
print("Squares:", squares)

# Filter even numbers and square them
even_squares = [x**2 for x in numbers if x % 2 == 0]
print("Even squares:", even_squares)

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [item for row in matrix for item in row]
print("Flattened matrix:", flattened)

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['python', 'java', 'javascript']}
print("Word lengths:", word_lengths)

# Set comprehension
unique_squares = {x**2 for x in numbers}
print("Unique squares:", unique_squares)

# Generator expression (memory efficient)
sum_of_squares = sum(x**2 for x in numbers)
print("Sum of squares:", sum_of_squares)`
  },
  // TypeScript Templates
  {
    id: '10',
    name: 'TypeScript Interface & Class',
    description: 'TypeScript interfaces and classes with generics',
    language: 'TypeScript',
    difficulty: 'intermediate',
    category: 'OOP',
    code: `interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

class UserRepository implements Repository<User> {
  private users: User[] = [];
  private nextId = 1;

  async findById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  async delete(id: number): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    this.users.splice(userIndex, 1);
    return true;
  }
}

// Usage
const userRepo = new UserRepository();
userRepo.create({ name: "John Doe", email: "john@example.com", createdAt: new Date() });`
  },
  // Java Templates
  {
    id: '11',
    name: 'Java Stream API',
    description: 'Modern Java with Stream API and lambdas',
    language: 'Java',
    difficulty: 'intermediate',
    category: 'Functional',
    code: `import java.util.*;
import java.util.stream.Collectors;

public class StreamExample {
    static class Person {
        private String name;
        private int age;
        private String city;
        
        public Person(String name, int age, String city) {
            this.name = name;
            this.age = age;
            this.city = city;
        }
        
        // Getters
        public String getName() { return name; }
        public int getAge() { return age; }
        public String getCity() { return city; }
        
        @Override
        public String toString() {
            return String.format("Person{name='%s', age=%d, city='%s'}", name, age, city);
        }
    }
    
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 30, "New York"),
            new Person("Bob", 25, "London"),
            new Person("Charlie", 35, "New York"),
            new Person("Diana", 28, "Paris")
        );
        
        // Filter people over 25 and collect their names
        List<String> names = people.stream()
            .filter(person -> person.getAge() > 25)
            .map(Person::getName)
            .collect(Collectors.toList());
        System.out.println("Names of people over 25: " + names);
        
        // Group people by city
        Map<String, List<Person>> peopleByCity = people.stream()
            .collect(Collectors.groupingBy(Person::getCity));
        System.out.println("People grouped by city: " + peopleByCity);
        
        // Find average age
        double averageAge = people.stream()
            .mapToInt(Person::getAge)
            .average()
            .orElse(0.0);
        System.out.println("Average age: " + averageAge);
        
        // Find oldest person
        Optional<Person> oldest = people.stream()
            .max(Comparator.comparing(Person::getAge));
        oldest.ifPresent(person -> System.out.println("Oldest person: " + person));
    }
}`
  },
  // Go Templates
  {
    id: '12',
    name: 'Go HTTP Server',
    description: 'Simple HTTP server with Go',
    language: 'Go',
    difficulty: 'intermediate',
    category: 'Backend',
    code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "strconv"
    "time"
    
    "github.com/gorilla/mux"
)

type User struct {
    ID        int       \`json:"id"\`
    Name      string    \`json:"name"\`
    Email     string    \`json:"email"\`
    CreatedAt time.Time \`json:"created_at"\`
}

var users []User
var nextID = 1

func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }
    
    user.ID = nextID
    user.CreatedAt = time.Now()
    nextID++
    
    users = append(users, user)
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

func getUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }
    
    for _, user := range users {
        if user.ID == id {
            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(user)
            return
        }
    }
    
    http.Error(w, "User not found", http.StatusNotFound)
}

func main() {
    r := mux.NewRouter()
    
    r.HandleFunc("/users", getUsers).Methods("GET")
    r.HandleFunc("/users", createUser).Methods("POST")
    r.HandleFunc("/users/{id}", getUser).Methods("GET")
    
    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}`
  },
  // Rust Templates
  {
    id: '13',
    name: 'Rust Ownership Example',
    description: 'Rust ownership and borrowing concepts',
    language: 'Rust',
    difficulty: 'intermediate',
    category: 'Memory Management',
    code: `#[derive(Debug, Clone)]
struct User {
    name: String,
    email: String,
    age: u32,
}

impl User {
    fn new(name: String, email: String, age: u32) -> Self {
        User { name, email, age }
    }
    
    fn greet(&self) -> String {
        format!("Hello, my name is {} and I'm {} years old", self.name, self.age)
    }
    
    fn update_age(&mut self, new_age: u32) {
        self.age = new_age;
    }
}

fn process_user(user: &User) -> String {
    // Borrowing the user, not taking ownership
    format!("Processing user: {}", user.name)
}

fn take_ownership(user: User) -> User {
    // Taking ownership and returning it
    println!("Took ownership of: {}", user.name);
    user
}

fn main() {
    // Creating a new user
    let mut user = User::new(
        String::from("Alice"),
        String::from("alice@example.com"),
        25
    );
    
    println!("{:?}", user);
    println!("{}", user.greet());
    
    // Borrowing (no ownership transfer)
    let result = process_user(&user);
    println!("{}", result);
    
    // User is still available here
    user.update_age(26);
    println!("Updated user: {:?}", user);
    
    // Taking ownership
    let user = take_ownership(user);
    // user is moved back to us
    
    // Cloning to create a new owned value
    let user_clone = user.clone();
    println!("Original: {:?}", user);
    println!("Clone: {:?}", user_clone);
    
    // Vector of users
    let users = vec![
        User::new(String::from("Bob"), String::from("bob@example.com"), 30),
        User::new(String::from("Charlie"), String::from("charlie@example.com"), 35),
    ];
    
    for user in &users {
        println!("{}", user.greet());
    }
}`
  }
];

export default function AICodeGenerator() {
  const [language, setLanguage] = useState('JavaScript')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('beginner')
  const [includeExplanation, setIncludeExplanation] = useState(true)
  const [includeComments, setIncludeComments] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<CodeResponse | null>(null)
  const [availableOptions, setAvailableOptions] = useState<AvailableOptions>({
    languages: ['JavaScript', 'Python', 'TypeScript', 'Java', 'C++', 'PHP', 'Rust', 'Go', 'Scala', 'Kotlin', 'Swift', 'Dart'],
    topics: ['Variables and Data Types', 'Functions and Methods', 'Object-Oriented Programming'],
    difficulties: ['beginner', 'intermediate', 'advanced']
  })
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'ai' | 'live' | 'templates'>('ai');
  const [liveCode, setLiveCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, world!");');
  const [liveOutput, setLiveOutput] = useState('');
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null)
  const [shareUrl, setShareUrl] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [recentTopics, setRecentTopics] = useState<string[]>([])
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false)
  const [codeQuality, setCodeQuality] = useState<'basic' | 'production' | 'educational'>('educational')
  const [executionHistory, setExecutionHistory] = useState<Array<{code: string, output: string, timestamp: number}>>([])
  const [showHistory, setShowHistory] = useState(false)
  const [codeSnippets, setCodeSnippets] = useState([
    { name: 'Hello World', code: 'console.log("Hello, World!");' },
    { name: 'Array Methods', code: 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log("Doubled:", doubled);' },
    { name: 'Async Function', code: 'async function fetchData() {\n  await new Promise(resolve => setTimeout(resolve, 1000));\n  return "Data fetched!";\n}\n\nfetchData().then(console.log);' },
    { name: 'Object Destructuring', code: 'const user = { name: "John", age: 30, city: "NYC" };\nconst { name, age } = user;\nconsole.log(name, age);' }
  ])
  const [templateSearch, setTemplateSearch] = useState('')
  const [templateCategory, setTemplateCategory] = useState('All')
  const [codeStyle, setCodeStyle] = useState<'functional' | 'oop' | 'procedural'>('functional')
  const [framework, setFramework] = useState<string>('')
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [customInstructions, setCustomInstructions] = useState('')
  const [codeComplexity, setCodeComplexity] = useState<'simple' | 'moderate' | 'complex'>('moderate')
  const [includeTests, setIncludeTests] = useState(false)
  const [includeDocumentation, setIncludeDocumentation] = useState(false)
  const [outputFormat, setOutputFormat] = useState<'code-only' | 'with-explanation' | 'tutorial'>('with-explanation')
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>([])
  const [codeMetrics, setCodeMetrics] = useState<{lines: number, characters: number, functions: number} | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [autoSave, setAutoSave] = useState(true)
  const [savedCodes, setSavedCodes] = useState<Array<{id: string, name: string, code: string, language: string, timestamp: number}>>([])
  const { showSuccess, showError, showInfo } = useNotifications()

  useEffect(() => {
    // Fetch available options on component mount
    fetchAvailableOptions()
  }, [])

  const fetchAvailableOptions = async () => {
    try {
      const response = await fetch('/api/generate-code')
      if (response.ok) {
        const data = await response.json()
        setAvailableOptions(data)
      }
    } catch (error) {
      console.error('Failed to fetch available options:', error)
    }
  }

  const generateCode = async () => {
    if (!topic.trim()) {
      showError('Topic Required', 'Please enter a topic to generate code for.')
      return
    }

    // Add to recent topics
    if (!recentTopics.includes(topic.trim())) {
      setRecentTopics(prev => [topic.trim(), ...prev.slice(0, 4)])
    }

    setIsLoading(true)
    setGeneratedCode(null)

    try {
      console.log('Sending request with parameters:', {
        topic: topic.trim(),
        language,
        difficulty,
        includeExplanation,
        includeComments,
        codeQuality,
        codeStyle,
        framework,
        customInstructions
      })

      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          language,
          difficulty,
          includeExplanation,
          includeComments,
          codeQuality,
          codeStyle,
          framework,
          customInstructions
        }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      if (data.success && data.data) {
        setGeneratedCode(data.data)
        showSuccess('Code Generated!', `Successfully generated ${difficulty}-level ${language} code for ${topic}`)
      } else {
        throw new Error(data.error || 'Invalid response format')
      }
    } catch (error: any) {
      console.error('Error generating code:', error)
      showError('Generation Failed', error.message || 'Failed to generate code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!generatedCode) return

    try {
      await navigator.clipboard.writeText(generatedCode.code)
      setCopied(true)
      showSuccess('Copied!', 'Code copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showError('Copy Failed', 'Failed to copy code to clipboard')
    }
  }

  const downloadCode = () => {
    if (!generatedCode) return

    const blob = new Blob([generatedCode.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${topic.replace(/\s+/g, '_')}_${language}.${getFileExtension(language)}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showSuccess('Downloaded!', 'Code file downloaded successfully')
  }

  const clearGeneratedCode = () => {
    setGeneratedCode(null);
  };

  const shareCode = () => {
    if (!generatedCode) return
    setShowShareModal(true)
  }

  const loadTemplate = (template: CodeTemplate) => {
    setSelectedTemplate(template)
    setLanguage(template.language)
    setDifficulty(template.difficulty)
    setTopic(template.name)
    setGeneratedCode({
      code: template.code,
      explanation: template.description,
      keyPoints: [`This is a ${template.difficulty}-level ${template.language} example`],
      difficulty: template.difficulty,
      language: template.language,
      topic: template.name
    })
    setActiveTab('ai')
  }

  const loadTemplateToLiveEditor = (template: CodeTemplate) => {
    setLanguage(template.language)
    setLiveCode(template.code)
    setActiveTab('live')
  }

  const getFileExtension = (lang: string) => {
    const extensions: { [key: string]: string } = {
      'JavaScript': 'js',
      'TypeScript': 'ts',
      'Python': 'py',
      'Java': 'java',
      'C++': 'cpp',
      'C#': 'cs',
      'Go': 'go',
      'Rust': 'rs',
      'PHP': 'php',
      'Ruby': 'rb',
      'Swift': 'swift',
      'Kotlin': 'kt',
      'Dart': 'dart'
    }
    return extensions[lang] || 'txt'
  }

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Java': 'bg-red-500',
      'C++': 'bg-purple-500',
      'C#': 'bg-purple-600',
      'Go': 'bg-cyan-500',
      'Rust': 'bg-orange-500',
      'PHP': 'bg-purple-400',
      'Ruby': 'bg-red-400',
      'Swift': 'bg-orange-400',
      'Kotlin': 'bg-purple-500',
      'Dart': 'bg-blue-400'
    }
    return colors[lang] || 'bg-gray-500'
  }

  const getCodeMirrorExtension = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
      case 'typescript':
        return javascript()
      case 'python':
        return python()
      case 'java':
        return java()
      case 'c++':
      case 'cpp':
        return cpp()
      case 'php':
        return php()
      case 'rust':
        return rust()
      default:
        return javascript()
    }
  }

  // Enhanced live code runner with multiple language support
  const runLiveCode = () => {
    try {
      if (language === 'JavaScript' || language === 'TypeScript') {
        // Capture console.log output
        const originalConsoleLog = console.log;
        const logs: string[] = [];
        
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
          originalConsoleLog.apply(console, args);
        };

        // Create a safe execution environment
        const safeEval = (code: string) => {
          try {
            // eslint-disable-next-line no-eval
            const result = eval(code);
            return result;
          } catch (error) {
            throw error;
          } finally {
            // Restore console.log
            console.log = originalConsoleLog;
          }
        };

        const result = safeEval(liveCode);
        
        // Format output
        let output = '';
        if (logs.length > 0) {
          output += logs.join('\n') + '\n';
        }
        if (result !== undefined) {
          output += `Result: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`;
        }
        
        const finalOutput = output || 'Code executed successfully (no output)';
        setLiveOutput(finalOutput);
        
        // Save to execution history
        setExecutionHistory(prev => [{
          code: liveCode,
          output: finalOutput,
          timestamp: Date.now()
        }, ...prev.slice(0, 9)]);
        
      } else {
        setLiveOutput(`Live execution is currently only available for JavaScript/TypeScript.\n\nFor ${language}, you can use the syntax highlighting and editing features, but execution requires a proper ${language} runtime environment.`);
      }
    } catch (err: any) {
      const errorOutput = `Error: ${err.message}\n\nStack trace:\n${err.stack || 'No stack trace available'}`;
      setLiveOutput(errorOutput);
      
      // Save error to execution history
      setExecutionHistory(prev => [{
        code: liveCode,
        output: errorOutput,
        timestamp: Date.now()
      }, ...prev.slice(0, 9)]);
    }
  };

  const filteredTemplates = codeTemplates.filter(template => {
    const matchesLanguage = template.language === language || language === 'All'
    const matchesSearch = template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
                         template.description.toLowerCase().includes(templateSearch.toLowerCase())
    const matchesCategory = templateCategory === 'All' || template.category === templateCategory
    return matchesLanguage && matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Switcher */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors border-b-2 ${activeTab === 'ai' ? 'border-primary text-primary bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 bg-gray-100 dark:bg-gray-900'}`}
          onClick={() => setActiveTab('ai')}
        >
          <FiCode className="inline mr-2" />
          AI Code
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors border-b-2 ${activeTab === 'live' ? 'border-primary text-primary bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 bg-gray-100 dark:bg-gray-900'}`}
          onClick={() => setActiveTab('live')}
        >
          <FiPlay className="inline mr-2" />
          Live Code
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors border-b-2 ${activeTab === 'templates' ? 'border-primary text-primary bg-white dark:bg-gray-800' : 'border-transparent text-gray-500 bg-gray-100 dark:bg-gray-900'}`}
          onClick={() => setActiveTab('templates')}
        >
          <FiBookOpen className="inline mr-2" />
          Templates
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'ai' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Generate Code</h3>
              
              <div className="space-y-6">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Programming Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {availableOptions.languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Topic or Concept
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      onFocus={() => setShowTopicSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowTopicSuggestions(false), 200)}
                      placeholder="e.g., Async/Await, React Hooks, Database Queries..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    {showTopicSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {recentTopics.length > 0 && (
                          <div className="p-2">
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Recent Topics</div>
                            {recentTopics.map((recentTopic, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setTopic(recentTopic)
                                  setShowTopicSuggestions(false)
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              >
                                {recentTopic}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Popular Topics</div>
                          {['Async/Await', 'React Hooks', 'Database Queries', 'Error Handling', 'API Integration', 'State Management', 'Component Lifecycle', 'Event Handling'].map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => {
                                setTopic(suggestion)
                                setShowTopicSuggestions(false)
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Difficulty Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {availableOptions.difficulties.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Include Explanation Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Include Explanation
                  </label>
                  <button
                    onClick={() => setIncludeExplanation(!includeExplanation)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      includeExplanation ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        includeExplanation ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Include Comments Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Include Comments
                  </label>
                  <button
                    onClick={() => setIncludeComments(!includeComments)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      includeComments ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        includeComments ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Code Quality Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Code Quality
                  </label>
                  <select
                    value={codeQuality}
                    onChange={(e) => setCodeQuality(e.target.value as 'basic' | 'production' | 'educational')}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="educational">Educational (Best for Learning)</option>
                    <option value="production">Production Ready</option>
                    <option value="basic">Basic (Simple Examples)</option>
                  </select>
                </div>

                {/* Advanced Options Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Advanced Options
                  </label>
                  <button
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showAdvancedOptions ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showAdvancedOptions ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Advanced Options Panel */}
                {showAdvancedOptions && (
                  <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    {/* Code Style Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Code Style
                      </label>
                      <select
                        value={codeStyle}
                        onChange={(e) => setCodeStyle(e.target.value as 'functional' | 'oop' | 'procedural')}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="functional">Functional Programming</option>
                        <option value="oop">Object-Oriented Programming</option>
                        <option value="procedural">Procedural Programming</option>
                      </select>
                    </div>

                    {/* Framework Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Framework/Library
                      </label>
                      <select
                        value={framework}
                        onChange={(e) => setFramework(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="">No Framework</option>
                        {language === 'JavaScript' && (
                          <>
                            <option value="React">React</option>
                            <option value="Vue">Vue.js</option>
                            <option value="Angular">Angular</option>
                            <option value="Express">Express.js</option>
                            <option value="Node.js">Node.js</option>
                          </>
                        )}
                        {language === 'Python' && (
                          <>
                            <option value="Django">Django</option>
                            <option value="Flask">Flask</option>
                            <option value="FastAPI">FastAPI</option>
                            <option value="Pandas">Pandas</option>
                            <option value="NumPy">NumPy</option>
                          </>
                        )}
                        {language === 'Java' && (
                          <>
                            <option value="Spring">Spring Boot</option>
                            <option value="Hibernate">Hibernate</option>
                            <option value="Maven">Maven</option>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Custom Instructions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Custom Instructions
                      </label>
                      <textarea
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        placeholder="Add any specific requirements or preferences..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={generateCode}
                  disabled={isLoading || !topic.trim()}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <FiRefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiCode className="w-5 h-5" />
                      Generate Code
                    </>
                  )}
                </button>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setTopic('Async/Await')
                      setLanguage('JavaScript')
                      setDifficulty('intermediate')
                      setCodeQuality('educational')
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Quick Start
                  </button>
                  <button
                    onClick={() => {
                      setShowAdvancedOptions(!showAdvancedOptions)
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {showAdvancedOptions ? 'Hide' : 'Show'} Advanced
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Generating Code...</h3>
                      <p className="text-gray-600 dark:text-gray-400">Creating a {difficulty}-level {language} example for {topic}</p>
                    </div>
                  </div>
                </motion.div>
              ) : generatedCode ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Code Display */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(language)}`}></div>
                        <span className="font-medium text-gray-900 dark:text-white">{language}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">• {difficulty}</span>
                        {framework && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {framework}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyToClipboard}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          title="Copy code"
                        >
                          {copied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={downloadCode}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          title="Download code"
                        >
                          <FiDownload className="w-4 h-4" />
                        </button>
                        <button
                          onClick={shareCode}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          title="Share code"
                        >
                          <FiShare2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setLiveCode(generatedCode.code)
                            setActiveTab('live')
                            showSuccess('Code Loaded', 'Code has been loaded into the Live Editor')
                          }}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          title="Test in Live Editor"
                        >
                          <FiPlay className="w-4 h-4" />
                        </button>
                        <button
                          onClick={clearGeneratedCode}
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          title="Clear code"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <CodeMirror
                        value={generatedCode.code}
                        height="400px"
                        extensions={[getCodeMirrorExtension(language)]}
                        theme={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
                        basicSetup={{ 
                          lineNumbers: true, 
                          highlightActiveLine: true,
                          foldGutter: true,
                          drawSelection: true,
                          dropCursor: true,
                          allowMultipleSelections: true,
                          indentOnInput: true,
                          syntaxHighlighting: true,
                        }}
                        className="rounded-lg border border-gray-300 dark:border-gray-600"
                        readOnly={true}
                      />
                    </div>
                  </div>

                  {/* Explanation */}
                  {generatedCode.explanation && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiMessageSquare className="w-5 h-5" />
                        Explanation
                      </h4>
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{generatedCode.explanation}</p>
                      </div>
                    </div>
                  )}

                  {/* Key Points */}
                  {generatedCode.keyPoints && generatedCode.keyPoints.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FiZap className="w-5 h-5" />
                        Key Learning Points
                      </h4>
                      <ul className="space-y-3">
                        {generatedCode.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code Analysis */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiCode className="w-5 h-5" />
                      Code Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {generatedCode.code.split('\n').length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Lines of Code</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          {codeQuality}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Code Quality</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500 mb-1">
                          {codeStyle}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Programming Style</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm"
                >
                  <div className="text-center">
                    <FiCode className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Generate Code</h3>
                    <p className="text-gray-600 dark:text-gray-400">Select a language, enter a topic, and click "Generate Code" to get started.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : activeTab === 'live' ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Live Code Editor</h3>
          
          {/* Language Selection for Live Editor */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python (Syntax Only)</option>
              <option value="Java">Java (Syntax Only)</option>
              <option value="C++">C++ (Syntax Only)</option>
              <option value="PHP">PHP (Syntax Only)</option>
              <option value="Rust">Rust (Syntax Only)</option>
            </select>
          </div>

          {/* Code Snippets */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Snippets
            </label>
            <div className="flex flex-wrap gap-2">
              {codeSnippets.map((snippet, index) => (
                <button
                  key={index}
                  onClick={() => setLiveCode(snippet.code)}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {snippet.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <CodeMirror
              value={liveCode}
              height="300px"
              extensions={[getCodeMirrorExtension(language)]}
              theme={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
              onChange={value => setLiveCode(value)}
              basicSetup={{ 
                lineNumbers: true, 
                highlightActiveLine: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
              }}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={runLiveCode}
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <FiPlay className="w-4 h-4" />
              Run Code
            </button>
            <button
              onClick={() => setLiveCode('// Write your JavaScript code here\nconsole.log("Hello, world!");')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition-colors"
            >
              History ({executionHistory.length})
            </button>
          </div>
          
          {/* Execution History */}
          {showHistory && executionHistory.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Recent Executions</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {executionHistory.map((item, index) => (
                  <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded border">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                    <div className="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-1 rounded text-xs mb-1">
                      {item.code.substring(0, 50)}...
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {item.output.substring(0, 100)}...
                    </div>
                    <button
                      onClick={() => setLiveCode(item.code)}
                      className="text-xs text-blue-500 hover:text-blue-700 mt-1"
                    >
                      Load Code
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 min-h-[100px] text-gray-800 dark:text-gray-100 font-mono text-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Output:</div>
            {liveOutput || <span className="text-gray-400">Output will appear here.</span>}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Code Templates</h3>
          
          {/* Template Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Languages</option>
                {availableOptions.languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Category
              </label>
              <select
                value={templateCategory}
                onChange={(e) => setTemplateCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Categories</option>
                <option value="Basics">Basics</option>
                <option value="Advanced">Advanced</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Structures">Data Structures</option>
                <option value="Async Programming">Async Programming</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Templates
              </label>
              <input
                type="text"
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Template Stats */}
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTemplates.length} of {codeTemplates.length} templates
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:border-primary/50 transition-colors hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getLanguageColor(template.language)}`}></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{template.language}</span>
                  <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                    {template.difficulty}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
                <div className="text-xs text-gray-500 dark:text-gray-500 mb-3 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded inline-block">
                  {template.category}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => loadTemplate(template)}
                    className="flex-1 px-3 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90 transition-colors"
                  >
                    Use in AI
                  </button>
                  {(template.language === 'JavaScript' || template.language === 'TypeScript') && (
                    <button
                      onClick={() => loadTemplateToLiveEditor(template)}
                      className="flex-1 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                    >
                      Run Live
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <FiBookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {templateSearch || templateCategory !== 'All' 
                  ? `No templates found matching your filters.`
                  : `No templates available for ${language}`
                }
              </p>
              {(templateSearch || templateCategory !== 'All') && (
                <button
                  onClick={() => {
                    setTemplateSearch('')
                    setTemplateCategory('All')
                    setLanguage('All')
                  }}
                  className="mt-2 text-sm text-primary hover:text-primary/80"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Share Modal */}
      <CodeShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareData={generatedCode ? {
          code: generatedCode.code,
          language: generatedCode.language,
          topic: generatedCode.topic,
          difficulty: generatedCode.difficulty,
          explanation: generatedCode.explanation,
          keyPoints: generatedCode.keyPoints
        } : null}
      />
    </div>
  )
} 