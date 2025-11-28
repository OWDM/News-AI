import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Document } from '@langchain/core/documents';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

/**
 * Create a vectorstore from article text
 * Note: Using MemoryVectorStore instead of Pinecone for simplicity and Vercel compatibility
 * The vectorstore is created fresh for each request (stateless)
 *
 * @param text - The article text to vectorize
 * @returns A vectorstore instance
 */
export async function createVectorstore(text: string) {
  try {
    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 100,
    });

    const docs = await textSplitter.createDocuments([text]);

    // Create embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create vectorstore in memory
    // Note: This is ephemeral - destroyed after the API call
    // For production with persistent storage, use Pinecone:
    // const pinecone = new Pinecone();
    // const index = pinecone.Index(process.env.PINECONE_INDEX!);
    // return await PineconeStore.fromDocuments(docs, embeddings, {
    //   pineconeIndex: index,
    //   namespace: `session-${Date.now()}`,
    // });

    const vectorstore = await MemoryVectorStore.fromDocuments(
      docs,
      embeddings
    );

    return vectorstore;
  } catch (error: any) {
    console.error('Error creating vectorstore:', error);
    throw new Error(`Failed to create vectorstore: ${error.message}`);
  }
}

/**
 * Alternative: Create vectorstore using Pinecone (for production)
 * Uncomment and use this if you have Pinecone configured
 */
/*
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';

export async function createVectorstoreWithPinecone(text: string, sessionId: string) {
  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 100,
    });

    const docs = await textSplitter.createDocuments([text]);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX!);

    return await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: sessionId, // Unique namespace per session
    });
  } catch (error: any) {
    console.error('Error creating Pinecone vectorstore:', error);
    throw new Error(`Failed to create Pinecone vectorstore: ${error.message}`);
  }
}
*/
