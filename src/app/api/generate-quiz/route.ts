import { NextResponse } from 'next/server'
import { DeepSeekAPI, DeepSeekError } from '@/lib/deepseek'
import { getQuizFromBank } from '@/utils/quizBank'

const deepseek = new DeepSeekAPI(process.env.DEEPSEEK_API_KEY || '')

const BING_API_KEY = process.env.BING_SEARCH_API_KEY

async function fetchInternetContent(topic: string) {
  if (!BING_API_KEY) return '';
  const url = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(topic)}&count=3`;
  try {
    const res = await fetch(url, {
      headers: { 'Ocp-Apim-Subscription-Key': BING_API_KEY }
    });
    const data = await res.json();
    return (data.webPages?.value || [])
      .map((item: any) => `${item.name}: ${item.snippet}`)
      .join('\n');
  } catch (e) {
    console.error('Bing search failed:', e);
    return '';
  }
}

export async function POST(request: Request) {
  try {
    const {
      language,
      topic,
      difficulty = 'beginner',
      quizType = 'multiple-choice',
      questionCount = 5,
      includeCodeSnippets = true,
      includePracticalExamples = true,
      userPerformance = null,
      adaptiveDifficulty = false
    } = await request.json()

    if (!language || !topic) {
      return NextResponse.json(
        { error: 'Language and topic are required' },
        { status: 400 }
      )
    }

    // Fetch recent internet content
    const internetContent = await fetchInternetContent(topic)

    // Adaptive difficulty adjustment based on user performance
    let adjustedDifficulty = difficulty
    if (adaptiveDifficulty && userPerformance) {
      const avgScore = userPerformance.averageScore || 0
      if (avgScore > 80 && difficulty === 'beginner') adjustedDifficulty = 'intermediate'
      else if (avgScore > 85 && difficulty === 'intermediate') adjustedDifficulty = 'advanced'
      else if (avgScore < 60 && difficulty === 'intermediate') adjustedDifficulty = 'beginner'
      else if (avgScore < 70 && difficulty === 'advanced') adjustedDifficulty = 'intermediate'
    }

    // Enhanced prompt with adaptive difficulty and user context
    const basePrompt = `You are an expert programming tutor. Generate a ${adjustedDifficulty} level quiz for "${topic}" in ${language}.

    ${userPerformance ? `User Context: Average score: ${userPerformance.averageScore}%, Weak areas: ${userPerformance.weakAreas?.join(', ') || 'None identified'}, Strong areas: ${userPerformance.strongAreas?.join(', ') || 'None identified'}. Focus more on weak areas.` : ''}`

    const quizTypeInstructions = {
      'multiple-choice': 'Create multiple-choice questions with 4 options (A, B, C, D)',
      'true-false': 'Create true/false questions with explanations',
      'fill-blank': 'Create fill-in-the-blank questions with code snippets',
      'code-completion': 'Create code completion questions where users complete code snippets',
      'matching': 'Create matching questions (e.g., match concepts to definitions)',
      'scenario': 'Create scenario-based questions with real-world programming situations'
    }

    const typeInstruction = quizTypeInstructions[quizType as keyof typeof quizTypeInstructions] || quizTypeInstructions['multiple-choice']

    const enhancedPrompt = internetContent
      ? `${basePrompt} Based on the following recent information about "${topic}", generate ${questionCount} ${quizType} questions. Use the content below to ensure questions are up-to-date and relevant.

Internet Content:
${internetContent}

Requirements:
- ${typeInstruction}
- ${includeCodeSnippets ? 'Include relevant code snippets where appropriate' : 'Focus on conceptual questions'}
- ${includePracticalExamples ? 'Include practical, real-world examples' : 'Focus on theoretical concepts'}
- Provide detailed explanations for correct answers
- Ensure questions are appropriate for ${difficulty} level
- Make questions engaging and educational

Format your response as a JSON array like this:
[
  {
    "question": "...",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "answer": "A",
    "explanation": "...",
    "codeSnippet": "...", // if applicable
    "difficulty": "beginner|intermediate|advanced",
    "category": "concept|syntax|best-practice|debugging"
  }
]

Make sure the JSON is valid and parsable.`
      : `${basePrompt} Generate ${questionCount} ${quizType} questions.

Requirements:
- ${typeInstruction}
- ${includeCodeSnippets ? 'Include relevant code snippets where appropriate' : 'Focus on conceptual questions'}
- ${includePracticalExamples ? 'Include practical, real-world examples' : 'Focus on theoretical concepts'}
- Provide detailed explanations for correct answers
- Ensure questions are appropriate for ${difficulty} level
- Make questions engaging and educational

Format your response as a JSON array like this:
[
  {
    "question": "...",
    "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
    "answer": "A",
    "explanation": "...",
    "codeSnippet": "...", // if applicable
    "difficulty": "beginner|intermediate|advanced",
    "category": "concept|syntax|best-practice|debugging"
  }
]

Make sure the JSON is valid and parsable.`

    let quiz
    try {
      const text = await deepseek.generateQuiz(enhancedPrompt, 1500)
      const start = text.indexOf('[')
      const end = text.lastIndexOf(']') + 1
      quiz = JSON.parse(text.slice(start, end))
    } catch (e) {
      console.log('AI quiz generation failed, using quiz bank as fallback')
      // Fallback to quiz bank
      quiz = getQuizFromBank(topic, difficulty, questionCount)
      if (quiz.length === 0) {
        return NextResponse.json(
          { error: 'Failed to generate quiz and no fallback available.' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ 
      quiz, 
      language, 
      topic, 
      difficulty,
      quizType,
      questionCount,
      includeCodeSnippets,
      includePracticalExamples
    })
  } catch (error: any) {
    console.error('Error generating quiz:', error)
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    )
  }
} 