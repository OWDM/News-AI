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
  - Inline submit button (green up arrow) appears in bottom-right when valid input detected
  - Custom scrollbar for content exceeding 10 lines
  - No processing spinner - clean minimal design
- `ProcessingProgress.tsx` - Claude-style progress indicator
  - Dynamic status messages that change based on progress percentage
  - Shimmer gradient progress bar (green to purple)
  - Smooth transitions with percentage display
  - Minimal design without phase indicator boxes
- `SummaryDisplay.tsx` - Arabic summary display with copy functionality
  - Large title formatting (first line as text-3xl)
  - Icon-only copy button with 1-second success animation
  - Small uppercase section heading
  - RTL text alignment for Arabic content
- `ArticleDisplay.tsx` - Original article with synchronized highlighting
  - Large title formatting (first line as text-3xl)
  - Small uppercase section heading
  - Supports highlight animation on first toggle
- `ToggleSwitch.tsx` - Modern toggle for highlighting control
  - Card-style background with border
  - ON/OFF text labels
  - Smooth transition animations
  - Default state: OFF
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

Additional state variables:
- `showHighlighting` - Boolean controlling highlight visibility (default: false)
- `processingComplete` - Boolean controlling results display
- `hasShownHighlighting` - Boolean tracking if animation has been shown (for first-time animation)

## UI/UX Features

### Design System
- **Dark theme** with CSS custom properties in `globals.css`
- **Color palette**: Dark backgrounds (#101010), purple accent (#a476ff), green indicator (#A9FF5B)
- **Typography**: Montserrat for body, Bungee for branding/logo
- **No emojis**: Clean professional design without emoji decorations
- Custom scrollbar styling for better dark mode aesthetics

### Animation Framework
Comprehensive animation system in `globals.css`:
- **Keyframe animations**: fadeIn, fadeInUp, slideInDown, slideInUp, scaleIn
- **Utility classes**: animate-fadeIn, animate-fadeInUp, animate-slideInDown, animate-slideInUp, animate-scaleIn
- **Delayed animations**: animate-delay-100, animate-delay-200, animate-delay-300
- **Smooth transitions**: smooth-transition (0.3s), smooth-transition-slow (0.5s)
- **Easing functions**: cubic-bezier(0.4, 0, 0.2, 1) for natural motion
- **Smooth scroll**: Applied to html element for anchor navigation

### Progress Loading
- **Smooth incremental updates**: Progress moves gradually with intermediate steps
- **Artificial delays**: 200-400ms delays between progress updates for perceived smoothness
- **Dynamic messages**: Status messages change based on progress percentage
  - < 20%: "Pondering, stand by..."
  - 20-40%: "Extracting key information..."
  - 40-60%: "Analyzing article structure..."
  - 60-80%: "Generating summary..."
  - 80-95%: "Almost there..."
  - 95-100%: "Finishing up..."

### Typography Hierarchy
- **Section headings**: Very small (text-xs uppercase) with reduced opacity for "ARABIC SUMMARY", "ENGLISH SUMMARY", "ORIGINAL ARTICLE"
- **Content titles**: Large (text-3xl font-bold) for first line of article/summary content
- **Smart detection**: First line automatically detected and styled as title
- **Body text**: Standard sizes with proper line-height for readability

### Input Component Features
- **Smart input detection**: Single textarea automatically determines if input is URL or article text
- **Dynamic sizing**: Grows from 1 line to 10 lines, then shows scrollbar
- **Rotating placeholders**: 4 example inputs rotate every 4 seconds with 3D flip animation
- **Inline submission**: Green arrow button appears in bottom-right when valid input detected
- **Validation feedback**: Red border and error message for multiple URLs
- **No processing indicator**: Clean design without spinning indicators

### Highlighting Features
- **Toggle control**: Modern toggle switch with ON/OFF labels, default state OFF
- **First-time animation**: Intended to show sweeping animation on first toggle (currently under development)
- **Color-coded matching**: Different colors for each summary sentence and its matched article sentences
- **Staggered reveal**: 800ms delay between each color group
- **Synchronized highlighting**: Same colors appear in both summary and original article

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
- **Staggered entrance**: Results sections appear with staggered delays for polished feel

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
