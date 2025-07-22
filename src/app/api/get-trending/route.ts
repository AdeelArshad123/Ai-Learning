import { NextResponse } from 'next/server'
import axios from 'axios'

// Fallback data in case GitHub API fails
const fallbackData = [
  {
    id: 1,
    name: "next.js",
    description: "The React Framework for the Web",
    stargazers_count: 115000,
    html_url: "https://github.com/vercel/next.js",
    language: "JavaScript",
    owner: {
      login: "vercel",
      avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4"
    }
  },
  {
    id: 2,
    name: "tailwindcss",
    description: "A utility-first CSS framework for rapid UI development",
    stargazers_count: 73000,
    html_url: "https://github.com/tailwindlabs/tailwindcss",
    language: "JavaScript",
    owner: {
      login: "tailwindlabs",
      avatar_url: "https://avatars.githubusercontent.com/u/67109815?v=4"
    }
  },
  {
    id: 3,
    name: "typescript",
    description: "TypeScript is JavaScript with syntax for types",
    stargazers_count: 94000,
    html_url: "https://github.com/microsoft/TypeScript",
    language: "TypeScript",
    owner: {
      login: "microsoft",
      avatar_url: "https://avatars.githubusercontent.com/u/6154722?v=4"
    }
  }
]

export async function GET() {
  try {
    // Use a simpler query that doesn't require authentication
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: 'stars:>5000 created:>2024-01-01',  // Simpler query for popular recent repos
        sort: 'stars',
        order: 'desc',
        per_page: 9
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'learning-platform'  // Required by GitHub API
      }
    })

    const repositories = response.data.items.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      stargazers_count: repo.stargazers_count,
      html_url: repo.html_url,
      language: repo.language || 'Unknown',
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
    }))

    return NextResponse.json(repositories)
  } catch (error: any) {
    console.error('Error fetching trending repositories:', error)
    
    // If we hit rate limits or other GitHub API issues, return fallback data
    if (error.response?.status === 403 || error.response?.status === 401) {
      console.log('Using fallback data due to API limitations')
      return NextResponse.json(fallbackData)
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || 'Failed to fetch trending repositories'
    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 500 }
    )
  }
} 