import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';
import type { SentenceMatch } from '@/types';

/**
 * Match summary sentences to article sentences for highlighting
 * Uses GPT-4o (full model) for complex sentence matching task
 *
 * @param article - The full article text
 * @param summary - The generated summary
 * @returns Array of sentence matches
 */
export async function matchSummaryWithArticle(
  article: string,
  summary: string
): Promise<SentenceMatch[]> {
  try {
    // Create LLM (use full GPT-4o for better matching accuracy)
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are tasked with analyzing an article and its summary to identify which sentences in the article correspond to each sentence in the summary.

Your goal is to create a mapping that will be used for highlighting. For each sentence in the summary, identify the relevant sentences in the article that contain the information or support that summary sentence.

Return your response as a JSON array where each element has:
- "summary_sentence": the exact sentence from the summary
- "article_sentences": an array of exact sentences from the article that support or relate to this summary sentence

**Important:**
1. Return ONLY valid JSON, no additional text or explanation
2. Extract exact sentences from the article (don't paraphrase)
3. Each summary sentence should map to 1-3 article sentences
4. If a summary sentence doesn't have a clear match, provide an empty array
5. Preserve exact punctuation and formatting

Example format (replace with actual content):
[
  {{
    "summary_sentence": "First sentence from summary.",
    "article_sentences": ["Matching sentence from article.", "Another matching sentence."]
  }},
  {{
    "summary_sentence": "Second sentence from summary.",
    "article_sentences": ["Corresponding article sentence."]
  }}
]`,
      ],
      [
        'human',
        `Article:
{article}

Summary:
{summary}

Provide the JSON mapping now.`,
      ],
    ]);

    // Create and run chain
    const chain = new LLMChain({
      llm,
      prompt,
    });

    const result = await chain.call({
      article: article,
      summary: summary,
    });

    // Clean and parse JSON response
    const jsonMatch = cleanAndParseJSON(result.text);

    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response from LLM');
    }

    return jsonMatch;
  } catch (error: any) {
    console.error('Error matching sentences:', error);
    throw new Error(`Failed to match sentences: ${error.message}`);
  }
}

/**
 * Clean and parse JSON from LLM response
 * Handles cases where LLM adds extra text or formatting
 *
 * @param text - Raw text from LLM
 * @returns Parsed JSON array or null if parsing fails
 */
function cleanAndParseJSON(text: string): SentenceMatch[] | null {
  try {
    // Try direct parse first
    return JSON.parse(text);
  } catch {
    // If direct parse fails, try to extract JSON from text
    try {
      // Look for JSON array pattern
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Try removing markdown code blocks
      const cleanedText = text
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim();

      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Failed to parse JSON from LLM response:', error);
      return null;
    }
  }
}
