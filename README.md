# NewsAI - Next.js Migration

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

## Project Structure

```
upgraded_next.js/
├── app/
│   ├── api/                      # API routes (serverless functions)
│   │   ├── extract-content/      # URL content extraction
│   │   ├── extract-key-info/     # RAG-based key info extraction
│   │   ├── generate-summary/     # Summary generation
│   │   ├── translate-arabic/     # Arabic translation
│   │   └── match-sentences/      # Sentence matching for highlighting
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ArticleInput.tsx          # Input component (text/URL)
│   ├── ProcessingProgress.tsx    # Progress indicator
│   ├── SummaryDisplay.tsx        # Summary display with highlighting
│   └── ArticleDisplay.tsx        # Article display with highlighting
├── lib/                          # Utility libraries
│   ├── content-extractor.ts      # ExtractorAPI integration
│   └── langchain/                # LangChain implementations
│       ├── vectorstore.ts        # Vectorstore creation
│       ├── qa-chain.ts           # RetrievalQA chain
│       ├── summary-chain.ts      # Summary generation chain
│       ├── translate-chain.ts    # Translation chain
│       └── match-chain.ts        # Sentence matching chain
├── types/
│   └── index.ts                  # TypeScript type definitions
└── public/                       # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- OpenAI API key
- ExtractorAPI key

### 1. Clone and Navigate

```bash
cd upgraded_next.js
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# ExtractorAPI Configuration
EXTRACTOR_API_KEY=your-extractor-api-key-here

# Optional: Pinecone Configuration (if using Pinecone instead of MemoryVectorStore)
# PINECONE_API_KEY=your-pinecone-api-key-here
# PINECONE_ENVIRONMENT=your-pinecone-environment
# PINECONE_INDEX=newsai
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables in Vercel project settings
4. Deploy

### Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

### Important Vercel Considerations

- **Serverless Timeout:** Default is 10 seconds (Hobby), 60 seconds (Pro)
- **Memory Limit:** 1GB (Hobby), 3GB (Pro)
- The entire processing pipeline (RAG + summary + translation + matching) may take 30-60 seconds
- Consider upgrading to Vercel Pro if you hit timeout issues
- Alternatively, split the processing into multiple API calls triggered by the user

## API Documentation

### POST /api/extract-content

Extract and clean article content from a URL.

**Request:**
```json
{
  "url": "https://example.com/article"
}
```

**Response:**
```json
{
  "content": "cleaned article text...",
  "error": null
}
```

### POST /api/extract-key-info

Extract key information using RAG (3 parallel QA queries).

**Request:**
```json
{
  "article": "article text..."
}
```

**Response:**
```json
{
  "keyInfo": {
    "answer1": "Main technical concepts...",
    "answer2": "Key findings...",
    "answer3": "Potential impacts..."
  },
  "error": null
}
```

### POST /api/generate-summary

Generate a structured 4-sentence summary.

**Request:**
```json
{
  "article": "article text...",
  "keyInfo": { ... }
}
```

**Response:**
```json
{
  "summary": "Title\n\nSentence 1. Sentence 2. Sentence 3. Sentence 4.",
  "error": null
}
```

### POST /api/translate-arabic

Translate summary to Arabic using fine-tuned model.

**Request:**
```json
{
  "summary": "English summary text..."
}
```

**Response:**
```json
{
  "arabicSummary": "الترجمة العربية...",
  "error": null
}
```

### POST /api/match-sentences

Match summary sentences to article sentences for highlighting.

**Request:**
```json
{
  "article": "...",
  "summary": "..."
}
```

**Response:**
```json
{
  "matches": [
    {
      "summary_sentence": "...",
      "article_sentences": ["...", "..."]
    }
  ],
  "error": null
}
```

## Features

### Core Functionality

- ✅ Article input via text or URL
- ✅ Content extraction and cleaning with LLM
- ✅ RAG-based key information extraction (3 parallel QA queries)
- ✅ Structured 4-sentence summary generation
- ✅ Arabic translation with fine-tuned model
- ✅ Interactive sentence highlighting
- ✅ One-click Arabic summary copy to clipboard
- ✅ Real-time progress tracking

### User Interface

- Clean, minimal design with Tailwind CSS
- Tab-based input (Text vs URL)
- Progress bar with phase indicators
- Toggle highlighting on/off
- Separate displays for Arabic summary, English summary, and original article
- Responsive layout

## Migration Notes

### Key Differences from Python Version

| Feature | Python/Streamlit | Next.js/TypeScript |
|---------|------------------|-------------------|
| **Vector Store** | FAISS (embedded) | MemoryVectorStore (ephemeral) |
| **State Management** | Streamlit session_state | React state + hooks |
| **Authentication** | Passcode + session tokens | None (removed as requested) |
| **Highlighting** | Server-generated HTML | Client-side React rendering |
| **Deployment** | Self-hosted | Vercel serverless |
| **Parallel Processing** | Python threading | Promise.all() |

### LangChain Migration

All Python LangChain components have been successfully migrated to LangChain.js:

- ✅ **RecursiveCharacterTextSplitter** → `@langchain/textsplitters`
- ✅ **OpenAIEmbeddings** → `@langchain/openai`
- ✅ **FAISS** → `MemoryVectorStore` (can be upgraded to Pinecone)
- ✅ **RetrievalQA Chain** → `RetrievalQAChain`
- ✅ **ChatPromptTemplate** → `@langchain/core/prompts`
- ✅ **LLMChain** → `langchain/chains`
- ✅ **Fine-tuned GPT-4o-mini** → Works identically via OpenAI API

### Vector Store Options

The current implementation uses **MemoryVectorStore** for simplicity and Vercel compatibility. This means:

- Vectorstore is created fresh for each request (ephemeral)
- No persistent storage between requests
- Works perfectly for Vercel's serverless architecture

**To upgrade to Pinecone (persistent vector storage):**

1. Install Pinecone:
   ```bash
   npm install @langchain/pinecone
   ```

2. Update `lib/langchain/vectorstore.ts` to use the commented Pinecone implementation

3. Add Pinecone credentials to `.env.local`

## Known Limitations

1. **Vectorstore is ephemeral** - Recreated for each article (by design for stateless serverless)
2. **No authentication** - Removed as per requirements (add back if needed)
3. **Serverless timeout** - May need Vercel Pro for longer processing times
4. **No streaming** - Processing happens in sequential API calls (could be improved)

## Performance Optimization

To improve performance on Vercel:

1. **Combine API calls** - Merge extract-key-info + generate-summary into one endpoint
2. **Use streaming** - Implement streaming responses for LLM calls
3. **Cache embeddings** - Store embeddings in Vercel KV for identical articles
4. **Upgrade to Vercel Pro** - Get 60s timeout instead of 10s

## Troubleshooting

### Error: "OPENAI_API_KEY is not configured"

Make sure you've created `.env.local` with your API keys.

### Error: "Failed to extract content"

Check that your `EXTRACTOR_API_KEY` is valid and active.

### Timeout errors on Vercel

The free tier has a 10-second timeout. Upgrade to Vercel Pro for 60-second timeout.

### Fine-tuned model not working

Ensure your OpenAI account has access to the fine-tuned model:
```
ft:gpt-4o-mini-2024-07-18:personal:arabic-translator-musaed:AEATefJ7
```

If not, update the model name in `lib/langchain/translate-chain.ts`.

## Development

### Running locally

```bash
npm run dev
```

### Type checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Future Enhancements

- [ ] Add streaming responses for better UX
- [ ] Implement caching for repeated articles
- [ ] Add authentication (JWT-based)
- [ ] Upgrade to Pinecone for persistent vector storage
- [ ] Add rate limiting
- [ ] Add analytics and monitoring
- [ ] Support multiple languages for translation
- [ ] Add PDF upload support
- [ ] Implement batch processing

## License

Same as original NewsAI project.

## Support

For issues or questions:
- Check the [MIGRATION_PLAN.md](../MIGRATION_PLAN.md) for technical details
- Review the API documentation above
- Check Vercel deployment logs for errors

## Credits

- Original Streamlit application: NewsAI
- Migration: Python → Next.js + TypeScript + LangChain.js
- Framework: Next.js 14
- AI: OpenAI GPT-4o-mini, GPT-4o
- Vector Store: LangChain.js MemoryVectorStore
