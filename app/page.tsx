'use client';

import { useState } from 'react';
import ArticleInput from '@/components/ArticleInput';
import ProcessingProgress from '@/components/ProcessingProgress';
import SummaryDisplay from '@/components/SummaryDisplay';
import ArticleDisplay from '@/components/ArticleDisplay';
import type { ProcessingState, KeyInfo, SentenceMatch } from '@/types';

export default function Home() {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    currentPhase: '',
    progress: 0,
    error: null,
    article: '',
    summary: '',
    arabicSummary: '',
    highlightedArticle: '',
    highlightedSummary: '',
    matchedSentences: [],
  });

  const [showHighlighting, setShowHighlighting] = useState(true);
  const [processingComplete, setProcessingComplete] = useState(false);

  const handleSubmit = async (content: string, isUrl: boolean) => {
    try {
      // Reset state
      setState({
        isProcessing: true,
        currentPhase: 'Initializing...',
        progress: 0,
        error: null,
        article: '',
        summary: '',
        arabicSummary: '',
        highlightedArticle: '',
        highlightedSummary: '',
        matchedSentences: [],
      });
      setProcessingComplete(false);

      let articleText = content;

      // Step 1: Extract content from URL if needed
      if (isUrl) {
        setState((prev) => ({
          ...prev,
          currentPhase: 'Extracting article from URL...',
          progress: 5,
        }));

        const response = await fetch('/api/extract-content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: content }),
        });

        const data = await response.json();

        if (data.error || !data.content) {
          throw new Error(data.error || 'Failed to extract content');
        }

        articleText = data.content;
      }

      setState((prev) => ({
        ...prev,
        article: articleText,
        currentPhase: 'Article loaded',
        progress: 10,
      }));

      // Step 2: Extract key information (RAG with 3 parallel QA)
      setState((prev) => ({
        ...prev,
        currentPhase: 'Extracting key information...',
        progress: 20,
      }));

      const keyInfoResponse = await fetch('/api/extract-key-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: articleText }),
      });

      const keyInfoData = await keyInfoResponse.json();

      if (keyInfoData.error || !keyInfoData.keyInfo) {
        throw new Error(keyInfoData.error || 'Failed to extract key information');
      }

      const keyInfo: KeyInfo = keyInfoData.keyInfo;

      setState((prev) => ({
        ...prev,
        currentPhase: 'Key information extracted',
        progress: 40,
      }));

      // Step 3: Generate summary
      setState((prev) => ({
        ...prev,
        currentPhase: 'Generating summary...',
        progress: 50,
      }));

      const summaryResponse = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: articleText, keyInfo }),
      });

      const summaryData = await summaryResponse.json();

      if (summaryData.error || !summaryData.summary) {
        throw new Error(summaryData.error || 'Failed to generate summary');
      }

      const summary: string = summaryData.summary;

      setState((prev) => ({
        ...prev,
        summary,
        currentPhase: 'Summary generated',
        progress: 65,
      }));

      // Step 4: Translate to Arabic
      setState((prev) => ({
        ...prev,
        currentPhase: 'Translating to Arabic...',
        progress: 70,
      }));

      const arabicResponse = await fetch('/api/translate-arabic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary }),
      });

      const arabicData = await arabicResponse.json();

      if (arabicData.error || !arabicData.arabicSummary) {
        throw new Error(arabicData.error || 'Failed to translate to Arabic');
      }

      const arabicSummary: string = arabicData.arabicSummary;

      setState((prev) => ({
        ...prev,
        arabicSummary,
        currentPhase: 'Translation complete',
        progress: 85,
      }));

      // Step 5: Match sentences for highlighting
      setState((prev) => ({
        ...prev,
        currentPhase: 'Matching sentences for highlighting...',
        progress: 90,
      }));

      const matchResponse = await fetch('/api/match-sentences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: articleText, summary }),
      });

      const matchData = await matchResponse.json();

      if (matchData.error || !matchData.matches) {
        throw new Error(matchData.error || 'Failed to match sentences');
      }

      const matches: SentenceMatch[] = matchData.matches;

      setState((prev) => ({
        ...prev,
        matchedSentences: matches,
        currentPhase: 'Complete!',
        progress: 100,
        isProcessing: false,
      }));

      setProcessingComplete(true);
    } catch (error: any) {
      console.error('Error processing article:', error);
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: error.message || 'An error occurred',
        currentPhase: 'Error',
        progress: 0,
      }));
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">NewsAI</h1>
        <p className="text-lg text-gray-600">
          AI-Powered Newsletter Assistant - Generate Summaries & Arabic Translations
        </p>
      </header>

      {/* Main Content */}
      <main className="space-y-8">
        {/* Input Section */}
        {!processingComplete && (
          <ArticleInput onSubmit={handleSubmit} isProcessing={state.isProcessing} />
        )}

        {/* Processing Progress */}
        {state.isProcessing && (
          <ProcessingProgress currentPhase={state.currentPhase} progress={state.progress} />
        )}

        {/* Error Message */}
        {state.error && (
          <div className="w-full max-w-4xl mx-auto p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{state.error}</p>
          </div>
        )}

        {/* Results Section */}
        {processingComplete && state.summary && (
          <>
            {/* Controls */}
            <div className="w-full max-w-4xl mx-auto flex justify-between items-center">
              <button
                onClick={() => setShowHighlighting(!showHighlighting)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                {showHighlighting ? 'Hide Highlighting' : 'Show Highlighting'}
              </button>

              <button
                onClick={() => {
                  setProcessingComplete(false);
                  setState({
                    isProcessing: false,
                    currentPhase: '',
                    progress: 0,
                    error: null,
                    article: '',
                    summary: '',
                    arabicSummary: '',
                    highlightedArticle: '',
                    highlightedSummary: '',
                    matchedSentences: [],
                  });
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Process New Article
              </button>
            </div>

            {/* Summary Display */}
            <SummaryDisplay
              summary={state.summary}
              arabicSummary={state.arabicSummary}
              matches={state.matchedSentences}
              showHighlighting={showHighlighting}
            />

            {/* Article Display */}
            <ArticleDisplay
              article={state.article}
              matches={state.matchedSentences}
              showHighlighting={showHighlighting}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-500 text-sm">
        <p>Built with Next.js, TypeScript, and LangChain.js</p>
        <p className="mt-1">Deployed on Vercel</p>
      </footer>
    </div>
  );
}
