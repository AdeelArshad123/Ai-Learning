import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface StoredContent {
  id: string
  title: string
  description: string
  content: string
  difficulty: string
  estimatedTime: number
  tags: string[]
  exercises: any[]
  quiz: any[]
  createdAt: string
  updatedAt: string
  metadata: {
    technology: string
    category: string
    popularity: number
    source: string
  }
}

// 💾 Content Storage API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, metadata } = body

    if (!content || !Array.isArray(content)) {
      return NextResponse.json(
        { error: 'Content array is required' },
        { status: 400 }
      )
    }

    // Ensure storage directory exists
    const storageDir = path.join(process.cwd(), 'data', 'generated-content')
    if (!existsSync(storageDir)) {
      await mkdir(storageDir, { recursive: true })
    }

    // Process and store each content item
    const storedContent: StoredContent[] = []
    const timestamp = new Date().toISOString()

    for (const item of content) {
      const storedItem: StoredContent = {
        ...item,
        metadata: {
          technology: item.tags?.[0] || 'unknown',
          category: metadata?.category || 'general',
          popularity: metadata?.popularity || 0,
          source: 'ai-generated',
          ...metadata
        },
        createdAt: item.createdAt || timestamp,
        updatedAt: timestamp
      }

      storedContent.push(storedItem)

      // Store individual content file
      const filename = `${item.id || `content_${Date.now()}`}.json`
      const filepath = path.join(storageDir, filename)
      
      await writeFile(filepath, JSON.stringify(storedItem, null, 2))
    }

    // Update content index
    await updateContentIndex(storedContent)

    return NextResponse.json({
      success: true,
      message: `Stored ${storedContent.length} content items`,
      data: {
        count: storedContent.length,
        items: storedContent.map(item => ({
          id: item.id,
          title: item.title,
          difficulty: item.difficulty,
          tags: item.tags
        }))
      },
      timestamp
    })

  } catch (error: any) {
    console.error('Error storing content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store content',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📚 Retrieve stored content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contentId = searchParams.get('id')
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const tags = searchParams.get('tags')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const storageDir = path.join(process.cwd(), 'data', 'generated-content')
    
    if (!existsSync(storageDir)) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        message: 'No content stored yet'
      })
    }

    // If specific content ID requested
    if (contentId) {
      const filepath = path.join(storageDir, `${contentId}.json`)
      if (existsSync(filepath)) {
        const content = JSON.parse(await readFile(filepath, 'utf-8'))
        return NextResponse.json({
          success: true,
          data: content
        })
      } else {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        )
      }
    }

    // Load content index
    const indexPath = path.join(storageDir, 'index.json')
    let contentIndex: StoredContent[] = []
    
    if (existsSync(indexPath)) {
      contentIndex = JSON.parse(await readFile(indexPath, 'utf-8'))
    }

    // Apply filters
    let filteredContent = contentIndex

    if (category) {
      filteredContent = filteredContent.filter(item => 
        item.metadata.category.toLowerCase().includes(category.toLowerCase())
      )
    }

    if (difficulty) {
      filteredContent = filteredContent.filter(item => 
        item.difficulty === difficulty
      )
    }

    if (tags) {
      const tagList = tags.split(',').map(tag => tag.trim().toLowerCase())
      filteredContent = filteredContent.filter(item =>
        item.tags.some(tag => tagList.includes(tag.toLowerCase()))
      )
    }

    // Sort by creation date (newest first)
    filteredContent.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Apply pagination
    const total = filteredContent.length
    const paginatedContent = filteredContent.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedContent,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      filters: {
        category,
        difficulty,
        tags
      }
    })

  } catch (error: any) {
    console.error('Error retrieving content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to retrieve content',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 🗑️ Delete stored content
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contentId = searchParams.get('id')

    if (!contentId) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const storageDir = path.join(process.cwd(), 'data', 'generated-content')
    const filepath = path.join(storageDir, `${contentId}.json`)

    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    // Remove file
    await require('fs/promises').unlink(filepath)

    // Update index
    const indexPath = path.join(storageDir, 'index.json')
    if (existsSync(indexPath)) {
      const contentIndex = JSON.parse(await readFile(indexPath, 'utf-8'))
      const updatedIndex = contentIndex.filter((item: StoredContent) => item.id !== contentId)
      await writeFile(indexPath, JSON.stringify(updatedIndex, null, 2))
    }

    return NextResponse.json({
      success: true,
      message: `Content ${contentId} deleted successfully`
    })

  } catch (error: any) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete content',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// 📝 Update content index
async function updateContentIndex(newContent: StoredContent[]): Promise<void> {
  try {
    const storageDir = path.join(process.cwd(), 'data', 'generated-content')
    const indexPath = path.join(storageDir, 'index.json')
    
    let existingIndex: StoredContent[] = []
    if (existsSync(indexPath)) {
      existingIndex = JSON.parse(await readFile(indexPath, 'utf-8'))
    }

    // Merge new content with existing, avoiding duplicates
    const updatedIndex = [...existingIndex]
    
    for (const item of newContent) {
      const existingIndex = updatedIndex.findIndex(existing => existing.id === item.id)
      if (existingIndex >= 0) {
        updatedIndex[existingIndex] = item // Update existing
      } else {
        updatedIndex.push(item) // Add new
      }
    }

    // Sort by creation date
    updatedIndex.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    await writeFile(indexPath, JSON.stringify(updatedIndex, null, 2))
  } catch (error) {
    console.error('Error updating content index:', error)
  }
}
