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

    // Call ExtractorAPI
    const response = await axios.get('https://extractorapi.com/api/v1/extractor/', {
      params: {
        apikey: extractorApiKey,
        url: url,
      },
      timeout: 30000, // 30 second timeout
    });

    if (!response.data || !response.data.text) {
      throw new Error('Failed to extract content from URL');
    }

    // Clean the extracted content
    const content = response.data.text;
    const cleaned = await cleanContentWithLLM(content);

    return cleaned;
  } catch (error: any) {
    console.error('Error extracting content:', error);
    throw new Error(`Failed to extract content: ${error.message}`);
  }
}

/**
 * Clean extracted content using LLM
 * @param content - Raw content from extraction
 * @returns Cleaned content
 */
async function cleanContentWithLLM(content: string): Promise<string> {
  try {
    const { ChatOpenAI } = await import('@langchain/openai');

    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Clean the following article content by:
1. Excluding all hyperlinks, URLs, and references
2. Excluding any HTML tags, metadata, or formatting styles
3. Maintaining the original paragraph structure
4. Keeping only the main article text
5. Removing advertisements, navigation elements, and headers/footers
6. Preserving technical terms and numbers exactly as they appear

Content:
${content}

Return only the cleaned article text with proper paragraph breaks.`;

    const response = await llm.invoke(prompt);
    return response.content as string;
  } catch (error: any) {
    console.error('Error cleaning content with LLM:', error);
    // If LLM cleaning fails, return the original content with basic cleaning
    return content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
      .trim();
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
