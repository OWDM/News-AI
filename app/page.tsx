'use client';

import { useState } from 'react';
import ArticleInput from '@/components/ArticleInput';
import ProcessingProgress from '@/components/ProcessingProgress';
import SummaryDisplay from '@/components/SummaryDisplay';
import ArticleDisplay from '@/components/ArticleDisplay';
import ToggleSwitch from '@/components/ToggleSwitch';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-bold mb-3 tracking-tight">NewsAI</h1>
          <p className="text-xl text-blue-100">
            AI-Powered Newsletter Assistant - Generate Summaries & Arabic Translations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-12">
        {/* Input Section */}
        {!processingComplete && (
          <div className="max-w-4xl mx-auto mb-12">
            <ArticleInput onSubmit={handleSubmit} isProcessing={state.isProcessing} />
          </div>
        )}

        {/* Processing Progress */}
        {state.isProcessing && (
          <div className="max-w-4xl mx-auto mb-12">
            <ProcessingProgress currentPhase={state.currentPhase} progress={state.progress} />
          </div>
        )}

        {/* Error Message */}
        {state.error && (
          <div className="max-w-4xl mx-auto mb-12 p-6 bg-red-50 border-2 border-red-300 text-red-800 rounded-xl shadow-md">
            <p className="font-bold text-lg mb-2">Error:</p>
            <p>{state.error}</p>
          </div>
        )}

        {/* Results Section */}
        {processingComplete && state.summary && (
          <>
            {/* Controls Bar */}
            <div className="max-w-7xl mx-auto mb-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <ToggleSwitch
                  enabled={showHighlighting}
                  onToggle={() => setShowHighlighting(!showHighlighting)}
                  label="Show Highlighting"
                />

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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                >
                  ✨ Process New Article
                </button>
              </div>
            </div>

            {/* Arabic Summary - Full Width */}
            <SummaryDisplay
              summary={state.summary}
              arabicSummary={state.arabicSummary}
              matches={state.matchedSentences}
              showHighlighting={showHighlighting}
            />

            {/* Two Column Layout: Article (left) + English Summary (right sticky) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Original Article (scrollable) */}
              <div>
                <ArticleDisplay
                  article={state.article}
                  matches={state.matchedSentences}
                  showHighlighting={showHighlighting}
                />
              </div>

              {/* Right Column - English Summary (sticky, shown inline by SummaryDisplay component) */}
              <div className="lg:block hidden">
                <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    English Summary
                  </h2>
                  <div
                    className="leading-relaxed text-gray-800 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        if (!showHighlighting || !state.matchedSentences || state.matchedSentences.length === 0) {
                          return state.summary;
                        }
                        const generateColors = (count: number): string[] => {
                          const colors: string[] = [];
                          for (let i = 0; i < count; i++) {
                            const hue = (i * 360) / count;
                            colors.push(`hsl(${hue}, 70%, 80%)`);
                          }
                          return colors;
                        };
                        const colors = generateColors(state.matchedSentences.length);
                        let highlightedText = state.summary;
                        state.matchedSentences.forEach((match, index) => {
                          const sentence = match.summary_sentence;
                          const color = colors[index];
                          const highlighted = `<span class="highlight-animate" style="background-color: ${color}; padding: 2px 4px; border-radius: 3px;">${sentence}</span>`;
                          highlightedText = highlightedText.replace(sentence, highlighted);
                        });
                        return highlightedText;
                      })(),
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
