# NewsAI 

AI-powered newsletter creation assistant that generates structured summaries and Arabic translations of technical articles.

## Overview

This is a complete migration of the original Streamlit/Python NewsAI application to Next.js with TypeScript and LangChain.js. The application:

- Extracts article content from URLs or direct text input
- Uses RAG (Retrieval-Augmented Generation) to extract key information
- Generates structured 4-sentence summaries using GPT-4o-mini
- Translates summaries to Arabic using a fine-tuned GPT-4o-mini model
- Highlights sentence mappings between summary and original article
- Provides one-click copying of Arabic summaries

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **AI/LLM:** LangChain.js + OpenAI (GPT-4o-mini, GPT-4o)
- **Vector Store:** MemoryVectorStore (ephemeral, in-memory)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel-ready
