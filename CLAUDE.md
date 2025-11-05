# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NewsAI is an AI-powered newsletter creation assistant that extracts technical articles, generates structured 4-sentence summaries using RAG (Retrieval-Augmented Generation), and translates them to Arabic. Built with Next.js 14 (App Router), TypeScript, and LangChain.js.

## Essential Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
```

### Environment Setup
Required environment variables in `.env.local`:
- `OPENAI_API_KEY` - For GPT-4o-mini models
- `EXTRACTOR_API_KEY` - For ExtractorAPI (URL content extraction)

Optional:
- `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, `PINECONE_INDEX` - If upgrading from MemoryVectorStore

## Architecture

### Processing Pipeline (5-step sequential flow)
The main application (`app/page.tsx`) orchestrates a 5-step pipeline:

1. **Content Extraction** (`/api/extract-content`) - Extracts article text from URL using ExtractorAPI
2. **Key Info Extraction** (`/api/extract-key-info`) - Uses RAG with 3 parallel QA queries to extract:
   - Main technical concepts
   - Key findings/advancements
   - Potential impacts/applications
3. **Summary Generation** (`/api/generate-summary`) - Creates structured 4-sentence summary (title + 4 sentences, max 110 words)
4. **Arabic Translation** (`/api/translate-arabic`) - Translates using fine-tuned model `ft:gpt-4o-mini-2024-07-18:personal:arabic-translator-musaed:AEATefJ7`
5. **Sentence Matching** (`/api/match-sentences`) - Maps summary sentences to article sentences for highlighting

### LangChain Implementation (`lib/langchain/`)

**Vector Store Strategy:**
- Currently uses `MemoryVectorStore` (ephemeral, created per request)
- Stateless design suitable for Vercel serverless deployment
- Each request creates fresh vectorstore from article text
- Pinecone integration code available but commented out in `vectorstore.ts`

**Key Chains:**
- `qa-chain.ts` - RetrievalQA chain with parallel question execution
- `summary-chain.ts` - LLMChain with structured prompt for 4-sentence format
- `translate-chain.ts` - Uses fine-tuned GPT-4o-mini model
- `match-chain.ts` - Sentence alignment for highlighting

**Important:** All LangChain operations run server-side in API routes. The vectorstore is destroyed after each API call (not persisted).

### Component Structure

- `ArticleInput.tsx` - Smart single-input textarea with automatic URL/text detection
  - Auto-detects URLs using regex pattern matching
  - Validates single URL limit (prevents multiple URLs)
  - Auto-grows from 1 line to 10 lines max (280px)
  - Rotating placeholder examples with 3D flip animation
  - Inline submit button (up arrow) appears when input is valid
  - Custom scrollbar for content exceeding 10 lines
- `ProcessingProgress.tsx` - Real-time progress indicator (0-100%)
- `SummaryDisplay.tsx` - English + Arabic summaries with highlighting toggle
- `ArticleDisplay.tsx` - Original article with synchronized highlighting
- `Navbar.tsx` - Animated navbar with scroll-responsive width and active section indicators
- `Contact.tsx` - Contact form with dark theme autofill styling
- `Footer.tsx` - Minimalist footer with logo and branding

Highlighting works by matching summary sentences to article sentences via LLM-based alignment.

### API Routes (all in `app/api/`)

Each route is a serverless function that:
1. Accepts POST requests with JSON body
2. Returns `{ data, error }` response format
3. Handles errors with descriptive messages

Type definitions in `types/index.ts` define request/response interfaces for all API routes.

### State Management

Uses React `useState` for client-side state in `app/page.tsx` - no external state management library. The `ProcessingState` interface tracks:
- Processing status and progress
- Current phase
- Article, summary, and translation
- Sentence matches for highlighting
- Error state

## UI/UX Features

### Design System
- **Dark theme** with CSS custom properties in `globals.css`
- **Color palette**: Dark backgrounds (#101010), purple accent (#a476ff), green indicator (#A9FF5B)
- **Typography**: Montserrat for body, Bungee for branding/logo
- Custom scrollbar styling for better dark mode aesthetics

### Input Component Features
- **Smart input detection**: Single textarea automatically determines if input is URL or article text
- **Dynamic sizing**: Grows from 1 line to 10 lines, then shows scrollbar
- **Rotating placeholders**: 4 example inputs rotate every 4 seconds with 3D flip animation
- **Inline submission**: Green arrow button appears in bottom-right when valid input detected
- **Validation feedback**: Red border and error message for multiple URLs

### Navbar Behavior
- **Scroll-responsive**: Width animates from 80% to compact size on scroll (desktop only)
- **Active indicators**: Green dot shows current section (home/generator/contact)
- **Logo animation**: Logo fades in on scroll (after 50px threshold)
- **Mobile-optimized**: Fixed bottom navbar on mobile, top navbar on desktop

### Form Styling
- **Autofill compatibility**: Custom styling prevents white background on browser autofill
- **RTL support**: Arabic text properly aligned right-to-left with `dir="rtl"`
- **Focus states**: Purple outline on input focus using `--sec` color variable

### Page Layout
- **Full viewport sections**: Each section uses `min-h-screen` for natural scroll stops
- **Responsive spacing**: Top padding on generator section prevents navbar overlap
- **Smooth scrolling**: Anchor links use smooth scroll behavior for better UX

## Key Technical Details

### Summary Format Requirements
The summary generator enforces:
- Title as proper noun/entity name (not a sentence)
- Exactly 4 sentences following specific pattern
- Max 110 words excluding title
- Preserves technical terms verbatim
- Includes specific metrics/numbers from article

### Fine-Tuned Translation Model
The Arabic translator uses a fine-tuned GPT-4o-mini model. If updating this model:
1. Update the `modelName` in `lib/langchain/translate-chain.ts:16`
2. The model is trained to preserve technical terms and maintain structure

### Vectorstore Considerations
If migrating to Pinecone:
1. Uncomment code in `lib/langchain/vectorstore.ts` (lines 55-87)
2. Add Pinecone env vars
3. Consider session-based namespaces to avoid cross-request contamination
4. Update all imports from `createVectorstore` to `createVectorstoreWithPinecone`

## Deployment

Built for Vercel deployment with:
- Next.js 14 App Router
- Serverless API routes
- Edge-compatible dependencies
- Environment variables managed via Vercel dashboard


## Git Commit Guidelines

When creating commits, attribute all work to Musaed only. Do not include Co-Authored-By tags or mention Claude/AI assistance in commit messages.
