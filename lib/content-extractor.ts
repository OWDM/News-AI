import axios from 'axios';

/**
 * Extract article content from a URL using ExtractorAPI
 * @param url - The URL to extract content from
 * @returns The cleaned article content
 */
export async function extractContentFromUrl(url: string): Promise<string> {
  try {
    const extractorApiKey = process.env.EXTRACTOR_API_KEY;

    if (!extractorApiKey || extractorApiKey === 'your-extractor-api-key-here') {
      throw new Error('EXTRACTOR_API_KEY is not configured in environment variables');
    }

    // Call ExtractorAPI with JSON structure
    const response = await axios.get('https://extractorapi.com/api/v1/extractor/', {
      params: {
        apikey: extractorApiKey,
        url: url,
      },
      timeout: 30000, // 30 second timeout
    });

    if (!response.data) {
      throw new Error('Failed to extract content from URL');
    }

    // Extract structured data from ExtractorAPI response
    const { title, text, description } = response.data;

    if (!text || text.trim().length === 0) {
      throw new Error('No article content found at URL');
    }

    // Build structured article with clear title separation
    const structuredContent = await buildStructuredArticle({
      title: title || '',
      text: text,
      description: description || '',
    });

    return structuredContent;
  } catch (error: any) {
    console.error('Error extracting content:', error);
    throw new Error(`Failed to extract content: ${error.message}`);
  }
}

/**
 * Build structured article from ExtractorAPI response
 * Uses LLM to properly format title and body with clear separation
 * @param data - Structured data from ExtractorAPI
 * @returns Properly formatted article with title as first line
 */
async function buildStructuredArticle(data: {
  title: string;
  text: string;
  description: string;
}): Promise<string> {
  try {
    const { ChatOpenAI } = await import('@langchain/openai');

    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are formatting a technical article for a newsletter system. Your task is to create a clean, structured article.

**Input Data:**
Title: ${data.title}
Description: ${data.description}
Article Text: ${data.text}

**Instructions:**
1. Format the output with the TITLE as the very first line (standalone, not in a sentence)
2. Add a blank line after the title
3. Then include the cleaned article body with proper paragraph structure
4. Remove all:
   - Hyperlinks, URLs, and references
   - HTML tags, metadata, formatting styles
   - Advertisements, navigation elements, headers/footers
   - Author bylines, publication dates, social media prompts
   - "Read more", "Subscribe", "Share" buttons
5. Preserve exactly:
   - Technical terms and jargon
   - Numbers, metrics, percentages
   - Proper paragraph breaks
   - Logical flow and structure

**Format:**
[TITLE]

[Body paragraph 1]

[Body paragraph 2]

...

Return only the formatted article - nothing else.`;

    const response = await llm.invoke(prompt);
    return response.content as string;
  } catch (error: any) {
    console.error('Error building structured article:', error);
    // Fallback: basic cleaning with manual structure
    const cleanedText = data.text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
      .trim();

    // Build structure manually if LLM fails
    return data.title ? `${data.title}\n\n${cleanedText}` : cleanedText;
  }
}

/**
 * Validate article content
 * @param article - Article text to validate
 * @returns True if valid, throws error if not
 */
export function validateArticle(article: string): boolean {
  const wordCount = article.trim().split(/\s+/).length;

  if (wordCount < 130) {
    throw new Error(`Article is too short. Minimum 130 words required, got ${wordCount} words.`);
  }

  return true;
}
