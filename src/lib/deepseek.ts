interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface DeepSeekCompletionRequest {
  model: string
  messages: DeepSeekMessage[]
  max_tokens?: number
  temperature?: number
  stream?: boolean
}

interface DeepSeekCompletionResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class DeepSeekAPI {
  private apiKey: string
  private baseURL: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.baseURL = 'https://api.deepseek.com/v1'
  }

  async createChatCompletion(request: DeepSeekCompletionRequest): Promise<DeepSeekCompletionResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`DeepSeek API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
    }

    return response.json()
  }

  async generateCode(prompt: string, systemPrompt: string, maxTokens: number = 3000): Promise<string> {
    const response = await this.createChatCompletion({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    })

    return response.choices[0]?.message?.content || ''
  }

  async generateQuiz(prompt: string, maxTokens: number = 1000): Promise<string> {
    const response = await this.createChatCompletion({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful programming tutor. Generate short, up-to-date quizzes in valid JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    })

    return response.choices[0]?.message?.content || ''
  }
}

export class DeepSeekError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'DeepSeekError'
  }
} 