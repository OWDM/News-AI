import { ChatOpenAI } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { createVectorstore } from './vectorstore';
import type { KeyInfo } from '@/types';

/**
 * Extract key information from article using RAG (Retrieval-Augmented Generation)
 * Runs 3 parallel QA queries to extract different aspects of the article
 *
 * @param article - The article text to analyze
 * @returns KeyInfo object with 3 answers
 */
export async function extractKeyInfo(article: string): Promise<KeyInfo> {
  try {
    // Create vectorstore from article
    const vectorstore = await createVectorstore(article);

    // Create LLM
    const llm = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      temperature: 0, // Deterministic output
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create retrieval QA chain
    const chain = RetrievalQAChain.fromLLM(
      llm,
      vectorstore.asRetriever(),
      {
        returnSourceDocuments: false,
      }
    );

    // Define the 3 questions (same as Python version)
    const questions = [
      'What are the main technical concepts discussed in this article?',
      'What are the key findings or advancements mentioned?',
      'What potential impacts or applications are discussed?',
    ];

    // Run all 3 questions in parallel (equivalent to Python threading)
    const [result1, result2, result3] = await Promise.all(
      questions.map((question) => chain.call({ query: question }))
    );

    // Extract answers
    const keyInfo: KeyInfo = {
      answer1: result1.text || '',
      answer2: result2.text || '',
      answer3: result3.text || '',
    };

    return keyInfo;
  } catch (error: any) {
    console.error('Error extracting key info:', error);
    throw new Error(`Failed to extract key information: ${error.message}`);
  }
}
