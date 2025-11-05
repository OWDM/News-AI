'use client';

import { useState, Fragment } from 'react';
import ArticleInput from '@/components/ArticleInput';
import ProcessingProgress from '@/components/ProcessingProgress';
import SummaryDisplay from '@/components/SummaryDisplay';
import ArticleDisplay from '@/components/ArticleDisplay';
import ToggleSwitch from '@/components/ToggleSwitch';
import Footer from '@/components/Footer';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';
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

  const [showHighlighting, setShowHighlighting] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [hasShownHighlighting, setHasShownHighlighting] = useState(false);

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
      setHasShownHighlighting(false); // Reset for new article

      let articleText = content;

      // Step 1: Extract content from URL if needed
      if (isUrl) {
        setState((prev) => ({
          ...prev,
          currentPhase: 'Extracting article from URL...',
          progress: 5,
        }));

        // Smooth progress increments
        await new Promise(resolve => setTimeout(resolve, 300));
        setState((prev) => ({ ...prev, progress: 8 }));

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
        progress: 12,
      }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 15 }));

      // Step 2: Extract key information (RAG with 3 parallel QA)
      setState((prev) => ({
        ...prev,
        currentPhase: 'Extracting key information...',
        progress: 20,
      }));

      await new Promise(resolve => setTimeout(resolve, 400));
      setState((prev) => ({ ...prev, progress: 25 }));

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
        progress: 38,
      }));

      await new Promise(resolve => setTimeout(resolve, 300));
      setState((prev) => ({ ...prev, progress: 42 }));

      // Step 3: Generate summary
      setState((prev) => ({
        ...prev,
        currentPhase: 'Generating summary...',
        progress: 48,
      }));

      await new Promise(resolve => setTimeout(resolve, 400));
      setState((prev) => ({ ...prev, progress: 52 }));

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
        progress: 62,
      }));

      await new Promise(resolve => setTimeout(resolve, 300));
      setState((prev) => ({ ...prev, progress: 66 }));

      // Step 4: Translate to Arabic
      setState((prev) => ({
        ...prev,
        currentPhase: 'Translating to Arabic...',
        progress: 70,
      }));

      await new Promise(resolve => setTimeout(resolve, 400));
      setState((prev) => ({ ...prev, progress: 74 }));

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
        progress: 82,
      }));

      await new Promise(resolve => setTimeout(resolve, 300));
      setState((prev) => ({ ...prev, progress: 86 }));

      // Step 5: Match sentences for highlighting
      setState((prev) => ({
        ...prev,
        currentPhase: 'Matching sentences for highlighting...',
        progress: 90,
      }));

      await new Promise(resolve => setTimeout(resolve, 300));
      setState((prev) => ({ ...prev, progress: 94 }));

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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Header */}
      <section id="home" className="min-h-screen flex flex-col justify-center">
        <header className="text-center">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              <img
                src="/newsai-logo.png"
                alt="News AI Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
              <h1 className="text-7xl md:text-8xl tracking-tight" style={{ color: 'var(--foreground)', fontFamily: 'Bungee, sans-serif' }}>
                News AI
              </h1>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--navbar-white-icon)' }}>
              Transform technical articles into structured summaries with AI-powered translations
            </p>
          </div>
        </header>
      </section>

      {/* Main Content */}
      <section id="generator" className="min-h-screen pt-24 md:pt-32">
        <main className="px-8 py-16">
        {/* Input Section */}
        {!processingComplete && (
          <div className="max-w-4xl mx-auto mb-12 animate-fadeInUp">
            <ArticleInput onSubmit={handleSubmit} isProcessing={state.isProcessing} />
          </div>
        )}

        {/* Processing Progress */}
        {state.isProcessing && (
          <div className="max-w-4xl mx-auto mb-12 animate-scaleIn">
            <ProcessingProgress currentPhase={state.currentPhase} progress={state.progress} />
          </div>
        )}

        {/* Error Message */}
        {state.error && (
          <div className="max-w-4xl mx-auto mb-12 p-6 rounded-xl shadow-md animate-slideInDown" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid #ff4444', color: '#ff6666' }}>
            <p className="font-bold text-lg mb-2">Error:</p>
            <p>{state.error}</p>
          </div>
        )}

        {/* Results Section */}
        {processingComplete && state.summary && (
          <>
            {/* New Article Button */}
            <div className="max-w-7xl mx-auto mb-8 text-center animate-fadeIn">
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
                className="px-10 py-4 rounded-xl smooth-transition shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-base"
                style={{ backgroundColor: 'var(--navbar-indicator)', color: '#101010' }}
              >
                Process New Article
              </button>
            </div>

            {/* Arabic Summary - Full Width */}
            <div className="animate-fadeInUp">
              <SummaryDisplay
                summary={state.summary}
                arabicSummary={state.arabicSummary}
                matches={state.matchedSentences}
                showHighlighting={showHighlighting}
                isFirstTime={!hasShownHighlighting && showHighlighting}
              />
            </div>

            {/* Highlight Toggle */}
            <div className="max-w-7xl mx-auto mb-8 flex justify-center animate-fadeIn animate-delay-100">
              <ToggleSwitch
                enabled={showHighlighting}
                onToggle={() => {
                  if (!showHighlighting && !hasShownHighlighting) {
                    setHasShownHighlighting(true);
                  }
                  setShowHighlighting(!showHighlighting);
                }}
                label="Show Highlighting"
              />
            </div>

            {/* Two Column Layout: Article (left) + English Summary (right sticky) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp animate-delay-200">
              {/* Left Column - Original Article (scrollable) */}
              <div>
                <ArticleDisplay
                  article={state.article}
                  matches={state.matchedSentences}
                  showHighlighting={showHighlighting}
                  isFirstTime={!hasShownHighlighting && showHighlighting}
                />
              </div>

              {/* Right Column - English Summary (sticky, shown inline by SummaryDisplay component) */}
              <div className="lg:block hidden">
                <div className="p-8 rounded-2xl shadow-lg sticky top-4 smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <h2 className="text-xs font-semibold uppercase tracking-wider mb-6 pb-4" style={{
                    color: 'var(--navbar-white-icon)',
                    opacity: 0.7,
                    borderBottom: '2px solid var(--border-color)'
                  }}>
                    English Summary
                  </h2>
                  <div
                    className="leading-relaxed whitespace-pre-wrap"
                    style={{ color: 'var(--foreground)', lineHeight: '1.8' }}
                  >
                    {(() => {
                      const renderHighlightedText = (text: string) => {
                        if (!showHighlighting || !state.matchedSentences || state.matchedSentences.length === 0) {
                          return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
                        }

                        const generateColors = (count: number): string[] => {
                          const colors: string[] = [];
                          for (let i = 0; i < count; i++) {
                            const hue = (i * 360) / count;
                            colors.push(`hsl(${hue}, 65%, 40%)`);
                          }
                          return colors;
                        };

                        const colors = generateColors(state.matchedSentences.length);
                        let remainingText = text;
                        const elements: React.ReactNode[] = [];
                        let keyCounter = 0;
                        const isFirstTime = !hasShownHighlighting && showHighlighting;

                        state.matchedSentences.forEach((match, index) => {
                          const sentence = match.summary_sentence;
                          const color = colors[index];
                          const animationDelay = index * 1200; // 1200ms delay between each color group

                          const sentenceIndex = remainingText.indexOf(sentence);
                          if (sentenceIndex !== -1) {
                            // Add text before the sentence (preserve whitespace)
                            if (sentenceIndex > 0) {
                              const beforeText = remainingText.substring(0, sentenceIndex);
                              elements.push(
                                <span key={`text-${keyCounter++}`} style={{ whiteSpace: 'pre-wrap' }}>
                                  {beforeText}
                                </span>
                              );
                            }

                            // Add highlighted sentence
                            elements.push(
                              <HighlightText
                                key={`highlight-${keyCounter++}`}
                                text={sentence}
                                color={color}
                                duration={1.5}
                                delay={isFirstTime ? animationDelay : 0}
                              />
                            );

                            // Update remaining text
                            remainingText = remainingText.substring(sentenceIndex + sentence.length);
                          }
                        });

                        // Add any remaining text (preserve whitespace)
                        if (remainingText) {
                          elements.push(
                            <span key={`text-${keyCounter++}`} style={{ whiteSpace: 'pre-wrap' }}>
                              {remainingText}
                            </span>
                          );
                        }

                        return <>{elements}</>;
                      };

                      // Make first line (title) larger
                      const lines = state.summary.split('\n').filter(line => line.trim());
                      if (lines.length > 0) {
                        const title = lines[0];
                        const rest = lines.slice(1).join('\n');
                        return (
                          <>
                            <div className="text-3xl font-bold mb-6" style={{ lineHeight: '1.4' }}>
                              {title}
                            </div>
                            <div className="text-base">
                              {renderHighlightedText(rest)}
                            </div>
                          </>
                        );
                      }

                      return renderHighlightedText(state.summary);
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        </main>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
