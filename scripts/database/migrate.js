#!/usr/bin/env node

/**
 * Database Migration Script
 * Handles database schema migrations and data transformations
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

class DatabaseMigrator {
  constructor() {
    this.mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_codelearner';
    this.migrationsDir = path.join(__dirname, 'migrations');
    this.client = null;
    this.db = null;
  }

  async run() {
    console.log('🗄️  Starting database migration...\n');
    
    try {
      await this.connect();
      await this.ensureMigrationsCollection();
      await this.runPendingMigrations();
      
      console.log('\n✅ Database migration completed successfully!');
    } catch (error) {
      console.error('\n❌ Migration failed:', error.message);
      process.exit(1);
    } finally {
      await this.disconnect();
    }
  }

  async connect() {
    console.log('🔌 Connecting to MongoDB...');
    
    this.client = new MongoClient(this.mongoUri);
    await this.client.connect();
    this.db = this.client.db();
    
    console.log('✅ Connected to MongoDB');
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }

  async ensureMigrationsCollection() {
    const collections = await this.db.listCollections({ name: 'migrations' }).toArray();
    
    if (collections.length === 0) {
      await this.db.createCollection('migrations');
      console.log('📋 Created migrations collection');
    }
  }

  async runPendingMigrations() {
    console.log('🔍 Checking for pending migrations...');
    
    // Get executed migrations
    const executedMigrations = await this.db.collection('migrations')
      .find({}, { projection: { name: 1 } })
      .toArray();
    
    const executedNames = executedMigrations.map(m => m.name);
    
    // Get available migration files
    const migrationFiles = this.getMigrationFiles();
    const pendingMigrations = migrationFiles.filter(file => 
      !executedNames.includes(file.name)
    );
    
    if (pendingMigrations.length === 0) {
      console.log('✅ No pending migrations');
      return;
    }
    
    console.log(`📝 Found ${pendingMigrations.length} pending migrations:`);
    pendingMigrations.forEach(migration => {
      console.log(`  • ${migration.name}`);
    });
    
    // Execute pending migrations
    for (const migration of pendingMigrations) {
      await this.executeMigration(migration);
    }
  }

  getMigrationFiles() {
    if (!fs.existsSync(this.migrationsDir)) {
      fs.mkdirSync(this.migrationsDir, { recursive: true });
      this.createInitialMigrations();
    }
    
    const files = fs.readdirSync(this.migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort()
      .map(file => ({
        name: file.replace('.js', ''),
        path: path.join(this.migrationsDir, file)
      }));
    
    return files;
  }

  async executeMigration(migration) {
    console.log(`\n🚀 Executing migration: ${migration.name}`);
    
    try {
      const migrationModule = require(migration.path);
      
      if (typeof migrationModule.up !== 'function') {
        throw new Error('Migration must export an "up" function');
      }
      
      // Execute the migration
      await migrationModule.up(this.db);
      
      // Record the migration as executed
      await this.db.collection('migrations').insertOne({
        name: migration.name,
        executedAt: new Date(),
        checksum: this.calculateChecksum(migration.path)
      });
      
      console.log(`✅ Migration ${migration.name} completed`);
      
    } catch (error) {
      console.error(`❌ Migration ${migration.name} failed:`, error.message);
      throw error;
    }
  }

  calculateChecksum(filePath) {
    const crypto = require('crypto');
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  }

  createInitialMigrations() {
    console.log('📝 Creating initial migration files...');
    
    // Create users collection migration
    const usersMigration = `
/**
 * Create users collection and indexes
 */

async function up(db) {
  console.log('Creating users collection...');
  
  // Create users collection
  await db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'name'],
        properties: {
          email: {
            bsonType: 'string',
            description: 'User email address'
          },
          name: {
            bsonType: 'string',
            description: 'User display name'
          },
          image: {
            bsonType: 'string',
            description: 'User profile image URL'
          },
          createdAt: {
            bsonType: 'date',
            description: 'Account creation date'
          },
          lastLoginAt: {
            bsonType: 'date',
            description: 'Last login timestamp'
          }
        }
      }
    }
  });
  
  // Create indexes
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('users').createIndex({ createdAt: 1 });
  
  console.log('✅ Users collection created');
}

async function down(db) {
  await db.collection('users').drop();
}

module.exports = { up, down };
`;
    
    fs.writeFileSync(
      path.join(this.migrationsDir, '001_create_users.js'),
      usersMigration
    );
    
    // Create user progress migration
    const progressMigration = `
/**
 * Create user progress tracking collections
 */

async function up(db) {
  console.log('Creating user progress collections...');
  
  // User progress collection
  await db.createCollection('user_progress', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'type'],
        properties: {
          userId: {
            bsonType: 'objectId',
            description: 'Reference to user'
          },
          type: {
            bsonType: 'string',
            enum: ['code_generation', 'quiz_completion', 'topic_completion'],
            description: 'Type of progress'
          },
          data: {
            bsonType: 'object',
            description: 'Progress data'
          },
          createdAt: {
            bsonType: 'date',
            description: 'Progress timestamp'
          }
        }
      }
    }
  });
  
  // Quiz results collection
  await db.createCollection('quiz_results', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'topic', 'score'],
        properties: {
          userId: {
            bsonType: 'objectId',
            description: 'Reference to user'
          },
          topic: {
            bsonType: 'string',
            description: 'Quiz topic'
          },
          language: {
            bsonType: 'string',
            description: 'Programming language'
          },
          score: {
            bsonType: 'number',
            minimum: 0,
            maximum: 100,
            description: 'Quiz score percentage'
          },
          answers: {
            bsonType: 'array',
            description: 'User answers'
          },
          completedAt: {
            bsonType: 'date',
            description: 'Quiz completion time'
          }
        }
      }
    }
  });
  
  // Create indexes
  await db.collection('user_progress').createIndex({ userId: 1, type: 1 });
  await db.collection('user_progress').createIndex({ createdAt: 1 });
  await db.collection('quiz_results').createIndex({ userId: 1 });
  await db.collection('quiz_results').createIndex({ topic: 1, language: 1 });
  
  console.log('✅ User progress collections created');
}

async function down(db) {
  await db.collection('user_progress').drop();
  await db.collection('quiz_results').drop();
}

module.exports = { up, down };
`;
    
    fs.writeFileSync(
      path.join(this.migrationsDir, '002_create_user_progress.js'),
      progressMigration
    );
    
    console.log('✅ Initial migration files created');
  }
}

// Run migration if called directly
if (require.main === module) {
  const migrator = new DatabaseMigrator();
  migrator.run().catch(console.error);
}

module.exports = DatabaseMigrator;
