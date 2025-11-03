import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';

/**
 * Translate English summary to Arabic using fine-tuned GPT-4o-mini model
 * Uses the same fine-tuned model as the Python version
 *
 * @param summary - The English summary to translate
 * @returns Arabic translation
 */
export async function translateToArabic(summary: string): Promise<string> {
  try {
    // Create fine-tuned LLM (same model as Python version)
    const fineTunedLLM = new ChatOpenAI({
      modelName: 'ft:gpt-4o-mini-2024-07-18:personal:arabic-translator-musaed:AEATefJ7',
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create prompt template
    const prompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are an expert translator specializing in technical translations from English to Arabic.

Your task is to translate the provided English summary into Arabic while:
1. Preserving all technical terms accurately
2. Maintaining the structure and formatting
3. Using proper Arabic grammar and syntax
4. Keeping the professional tone
5. Preserving any numbers, metrics, or specific measurements exactly as they appear

Provide only the Arabic translation without any additional commentary.`,
      ],
      ['human', '{text}'],
    ]);

    // Create and run chain
    const chain = new LLMChain({
      llm: fineTunedLLM,
      prompt,
    });

    const result = await chain.call({
      text: summary,
    });

    return result.text;
  } catch (error: any) {
    console.error('Error translating to Arabic:', error);
    throw new Error(`Failed to translate to Arabic: ${error.message}`);
  }
}
