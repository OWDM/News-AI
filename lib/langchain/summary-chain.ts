import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';
import type { KeyInfo } from '@/types';

/**
 * Generate a structured 4-sentence summary from article and key information
 * Replicates the Python LangChain summary generation logic
 *
 * @param article - The full article text
 * @param keyInfo - The extracted key information from QA
 * @returns A structured summary (title + 4 sentences)
 */
export async function generateSummary(
  article: string,
  keyInfo: KeyInfo
): Promise<string> {
  try {
    // Create LLM
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create prompt template (exact replica of Python version)
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are an expert in summarizing technical news articles with a focus on accuracy and clarity.

Your task is to write a concise, 4-sentence summary that captures the essence of the provided article. Follow these instructions strictly:

1. Start with a **title** that is a proper noun or entity name, not a sentence.
2. **Sentence 1 (What was developed):** Clearly state what was created, introduced, or developed. Mention the developer or organization if relevant.
3. **Sentence 2 (Functionality):** Explain how it works or what technology it uses. Be specific about the mechanism or process.
4. **Sentence 3 (Key results):** Highlight the main outcomes, improvements, or capabilities. Include specific numbers or metrics if available.
5. **Sentence 4 (Future plans):** Describe future directions, research plans, or potential applications. Indicate if there are any next steps.

**Important:**
- The summary should be **no more than 110 words** (excluding the title).
- Write in a professional, neutral tone suitable for a technical newsletter.
- Preserve technical terms exactly as they appear in the article.
- Emphasize important numbers, percentages, and specific measurements.
- Do not add information not present in the article.
- Structure your response as:
  Title

  Sentence 1. Sentence 2. Sentence 3. Sentence 4.`,
      ],
      [
        'human',
        `Article: {article}

Key Information:
- Main technical concepts: {answer1}
- Key findings/advancements: {answer2}
- Potential impacts/applications: {answer3}

Generate the summary now.`,
      ],
    ]);

    // Create and run chain
    const chain = new LLMChain({
      llm,
      prompt,
    });

    const result = await chain.call({
      article: article,
      answer1: keyInfo.answer1,
      answer2: keyInfo.answer2,
      answer3: keyInfo.answer3,
    });

    return result.text;
  } catch (error: any) {
    console.error('Error generating summary:', error);
    throw new Error(`Failed to generate summary: ${error.message}`);
  }
}
