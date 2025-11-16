import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Rate limiting setup
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_IP = 10; // Max 10 requests per minute per IP
const MAX_REQUESTS_PER_HOUR = 50; // Max 50 requests per hour per IP

// In-memory rate limiting (in production, use Redis)
const ipRequestCounts = new Map<string, { count: number; hourlyCount: number; lastReset: number; hourlyReset: number }>();

// Validate request source
function validateRequestSource(referer: string | null, userAgent: string | null): boolean {
  if (!referer || !userAgent) return false;
  
  // Check if request comes from our domain
  const url = new URL(referer);
  const isLocalDev = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const isProdDomain = url.hostname.includes('12factor.me') || url.hostname.includes('vercel.app');
  
  if (!isLocalDev && !isProdDomain) return false;
  
  // Check if it's from prompt-engineering pages
  return referer.includes('/prompt-engineering/');
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now();
  const record = ipRequestCounts.get(ip) || { 
    count: 0, 
    hourlyCount: 0, 
    lastReset: now, 
    hourlyReset: now 
  };
  
  // Reset minute counter
  if (now - record.lastReset > RATE_LIMIT_WINDOW_MS) {
    record.count = 0;
    record.lastReset = now;
  }
  
  // Reset hourly counter
  if (now - record.hourlyReset > 60 * 60 * 1000) {
    record.hourlyCount = 0;
    record.hourlyReset = now;
  }
  
  // Check limits
  if (record.count >= MAX_REQUESTS_PER_IP) {
    return { allowed: false, message: 'Rate limit exceeded: too many requests per minute' };
  }
  
  if (record.hourlyCount >= MAX_REQUESTS_PER_HOUR) {
    return { allowed: false, message: 'Rate limit exceeded: too many requests per hour' };
  }
  
  // Increment counters
  record.count++;
  record.hourlyCount++;
  ipRequestCounts.set(ip, record);
  
  return { allowed: true };
}

// Initialize LLM client with custom configuration support
function createLLMClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  const customUrl = process.env.LLM_API_URL;
  
  console.log(`LLM Configuration: model=${process.env.LLM_MODEL || 'gpt-3.5-turbo'}, customUrl=${customUrl ? 'set' : 'not set'}`);
  
  if (customUrl) {
    return new OpenAI({
      apiKey: apiKey,
      baseURL: customUrl,
      timeout: 10000, // 10 seconds timeout
    });
  }
  
  // Default OpenAI configuration
  return new OpenAI({
    apiKey: apiKey,
    timeout: 10000, // 10 seconds timeout
  });
}

const llmClient = createLLMClient();

export async function POST(request: NextRequest) {
  try {
    // Security validations
    const referer = request.headers.get('referer');
    const userAgent = request.headers.get('user-agent');
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    
    // Validate request source
    if (!validateRequestSource(referer, userAgent)) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid request source' },
        { status: 403 }
      );
    }
    
    // Rate limiting
    const rateLimitCheck = checkRateLimit(ip as string);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.message },
        { status: 429 }
      );
    }
    
    // Parse request body
    const body = await request.json();
    const { systemPrompt, userPrompt, mode, prefill } = body;
    
    // Validate required fields
    if (!userPrompt || typeof userPrompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: userPrompt is required' },
        { status: 400 }
      );
    }
    
    // Validate mode is either 'playground', 'practice', or 'evaluation'
    if (!mode || !['playground', 'practice', 'evaluation'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid request: mode must be either "playground", "practice", or "evaluation"' },
        { status: 400 }
      );
    }
    
    if (prefill && typeof prefill !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: prefill must be a string' },
        { status: 400 }
      );
    }
    
    // Validate prompt lengths to prevent abuse
    const maxUserPromptLength = mode === 'evaluation' ? 3000 : 2000;
    if (userPrompt.length > maxUserPromptLength) {
      return NextResponse.json(
        { error: `User prompt too long (max ${maxUserPromptLength} characters)` },
        { status: 400 }
      );
    }
    
    if (systemPrompt && systemPrompt.length > 1000) {
      return NextResponse.json(
        { error: 'System prompt too long (max 1000 characters)' },
        { status: 400 }
      );
    }
    
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: API key not configured' },
        { status: 500 }
      );
    }
    
    // Prepare messages
    type DeepSeekMessage = {
      role: 'system' | 'user' | 'assistant';
      content: string;
      prefix?: boolean;
    };
    const messages: DeepSeekMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    if (body.history !== undefined) {
      if (!Array.isArray(body.history)) {
        return NextResponse.json(
          { error: 'Invalid request: history must be an array' },
          { status: 400 }
        );
      }
      for (const msg of body.history) {
        if (!msg || (msg.role !== 'user' && msg.role !== 'assistant') || typeof msg.content !== 'string') {
          return NextResponse.json(
            { error: 'Invalid request: history entries must include role and content' },
            { status: 400 }
          );
        }
        messages.push({ role: msg.role, content: msg.content });
      }
    }
    
    messages.push({ role: 'user', content: userPrompt });

    let stopSequences: string[] | undefined = undefined;
    if (prefill) {
      messages.push({ role: 'assistant', content: prefill, prefix: true });
      const trimmedPrefill = prefill.trim();
      const xmlMatch = trimmedPrefill.match(/<([A-Za-z0-9:_-]+)(?:\s[^>]*)?>\s*$/);
      if (xmlMatch) {
        stopSequences = [`</${xmlMatch[1]}>`];
      } else if (trimmedPrefill.endsWith('{')) {
        stopSequences = ['}'];
      } else if (trimmedPrefill.endsWith('[')) {
        stopSequences = [']'];
      }
    }
    
    // Determine model and parameters based on mode
    const model = process.env.LLM_MODEL || 'deepseek-chat';
    const maxTokens = mode === 'evaluation' ? 50 : 500; // Evaluation needs enough tokens for detailed response
    const temperature = mode === 'evaluation' ? 0.2 : 0.7; // Lower temperature for more consistent evaluation
    
    let response = 'No response generated';
    
    if (process.env.LLM_API_URL) {
      // Handle custom API calls with fetch
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
        
        const customResponse = await fetch(process.env.LLM_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages,
            max_tokens: maxTokens,
            temperature: temperature,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: stopSequences,
          }),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!customResponse.ok) {
          throw new Error(`Custom API error: ${customResponse.status}`);
        }
        
        const customData = await customResponse.json();
        
        // Try to extract response from common formats
        if (customData.choices?.[0]?.message?.content) {
          response = customData.choices[0].message.content;
        } else if (customData.response) {
          response = customData.response;
        } else if (customData.text) {
          response = customData.text;
        } else if (typeof customData === 'string') {
          response = customData;
        } else {
          throw new Error('Unexpected response format from custom API');
        }
        
        return NextResponse.json({
          success: true,
          response,
          usage: customData.usage || null,
        });
        
      } catch (customError) {
        console.error('Custom API Error:', customError);
        // Fallback to OpenAI client
      }
    }
    
    // Use OpenAI client (default or fallback)
    const completion = await llmClient.chat.completions.create({
      model, // Use configured model
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      messages: messages.map(({ prefix, ...rest }) => rest),
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: stopSequences,
    });
    
    response = completion.choices[0]?.message?.content || 'No response generated';
    
    return NextResponse.json({
      success: true,
      response,
      usage: completion.usage,
    });
    
  } catch (error) {
    console.error('LLM API Error:', error);
    
    // Handle specific API errors
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('rate_limit') || errorMessage.includes('429')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('insufficient')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
      
      if (errorMessage.includes('unauthorized') || errorMessage.includes('403') || errorMessage.includes('401')) {
        return NextResponse.json(
          { error: 'API authentication error. Please check configuration.' },
          { status: 503 }
        );
      }
      
      if (errorMessage.includes('network') || errorMessage.includes('timeout') || errorMessage.includes('connection')) {
        return NextResponse.json(
          { error: 'Network error. Please try again later.' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
