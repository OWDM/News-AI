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

    // Create retrieval QA chain with optimized retrieval parameters
    const chain = RetrievalQAChain.fromLLM(
      llm,
      vectorstore.asRetriever({
        k: 8, // Retrieve more chunks for better context (default is 4)
        searchType: 'mmr', // Use Maximal Marginal Relevance for diversity
        searchKwargs: {
          fetchK: 20, // Fetch 20 candidates, then filter to top 8 with MMR
          lambda: 0.5, // Balance between relevance and diversity (0 = max diversity, 1 = max relevance)
        },
      }),
      {
        returnSourceDocuments: false,
      }
    );

    // Optimized questions aligned with 4-sentence summary structure
    const questions = [
      'What specific technology, system, or product was created or introduced? Who developed it and what is its core purpose?',
      'How does it work technically? What methods, algorithms, or mechanisms does it use? What are the key technical capabilities and measurable results (include specific numbers, percentages, or metrics)?',
      'What are the planned next steps, future research directions, or potential real-world applications mentioned?',
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
