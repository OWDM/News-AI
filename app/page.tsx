'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticleInput from '@/components/ArticleInput';
import ProcessingProgress from '@/components/ProcessingProgress';
import SummaryDisplay from '@/components/SummaryDisplay';
import ArticleDisplay from '@/components/ArticleDisplay';
import ToggleSwitch from '@/components/ToggleSwitch';
import Footer from '@/components/Footer';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';
import { TextAnimate } from '@/registry/magicui/text-animate';
import { motion } from 'framer-motion';
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
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only enabling animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);

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

      // Smooth scroll to generator section
      setTimeout(() => {
        const generatorSection = document.getElementById('generator');
        if (generatorSection) {
          generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

      let articleText = content;

      // Step 1: Extract content from URL if needed
      if (isUrl) {
        setState((prev) => ({
          ...prev,
          currentPhase: 'Extracting article from URL...',
          progress: 3,
        }));

        // Smooth progress increments
        await new Promise(resolve => setTimeout(resolve, 200));
        setState((prev) => ({ ...prev, progress: 6 }));

        await new Promise(resolve => setTimeout(resolve, 200));
        setState((prev) => ({ ...prev, progress: 9 }));

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

        setState((prev) => ({ ...prev, progress: 12 }));
        await new Promise(resolve => setTimeout(resolve, 150));
      }

      setState((prev) => ({
        ...prev,
        article: articleText,
        currentPhase: 'Article loaded',
        progress: 15,
      }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 18 }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 21 }));

      // Step 2: Extract key information (RAG with 3 parallel QA)
      setState((prev) => ({
        ...prev,
        currentPhase: 'Extracting key information...',
        progress: 24,
      }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 28 }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 32 }));

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
        progress: 36,
      }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 40 }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 44 }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 48 }));

      // Step 3: Generate summary
      setState((prev) => ({
        ...prev,
        currentPhase: 'Generating summary...',
        progress: 52,
      }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 56 }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 60 }));

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
        progress: 64,
      }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 68 }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 72 }));

      // Step 4: Translate to Arabic
      setState((prev) => ({
        ...prev,
        currentPhase: 'Translating to Arabic...',
        progress: 76,
      }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 79 }));

      await new Promise(resolve => setTimeout(resolve, 200));
      setState((prev) => ({ ...prev, progress: 82 }));

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

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 88 }));

      // Step 5: Match sentences for highlighting
      setState((prev) => ({
        ...prev,
        currentPhase: 'Matching sentences for highlighting...',
        progress: 91,
      }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 93 }));

      await new Promise(resolve => setTimeout(resolve, 150));
      setState((prev) => ({ ...prev, progress: 95 }));

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

      setState((prev) => ({ ...prev, progress: 97 }));
      await new Promise(resolve => setTimeout(resolve, 150));

      setState((prev) => ({ ...prev, progress: 99 }));
      await new Promise(resolve => setTimeout(resolve, 100));

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
      {/* Header with Input */}
      <section id="home" className="min-h-screen flex flex-col justify-center">
        <div className="text-center">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Link href="/" className="cursor-pointer">
                <img
                  src="/newsai-logo.png"
                  alt="News AI Logo"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain animate-logo-entrance"
                />
              </Link>
              <Link href="/" className="cursor-pointer">
                {mounted ? (
                  <TextAnimate
                    animation="blurInUp"
                    by="character"
                    once
                    as="h1"
                    className="text-5xl md:text-6xl tracking-tight navbar-brand"
                    style={{ color: 'var(--foreground)', fontFamily: 'Bungee, sans-serif' }}
                  >
                    News AI
                  </TextAnimate>
                ) : (
                  <h1 className="text-5xl md:text-6xl tracking-tight navbar-brand opacity-0" style={{ color: 'var(--foreground)', fontFamily: 'Bungee, sans-serif' }}>
                    News AI
                  </h1>
                )}
              </Link>
            </div>
            {mounted && (
              <p className="text-lg md:text-xl leading-relaxed mb-12" style={{ color: 'var(--navbar-white-icon)' }}>
                <TextAnimate
                  animation="fadeIn"
                  by="word"
                  as="span"
                  delay={0.5}
                  staggerDelay={0.05}
                >
                  Know exactly where your summary comes from—with interactive highlighting
                </TextAnimate>
              </p>
            )}

            {/* Input Section - Always visible on landing */}
            {!processingComplete && !state.isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <ArticleInput onSubmit={handleSubmit} isProcessing={state.isProcessing} />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section
        id="generator"
        className={`pt-24 md:pt-32 ${state.isProcessing ? 'min-h-screen flex items-center' : ''}`}
      >
        <main className="px-8 py-8 w-full">

        {/* Processing Progress */}
        {state.isProcessing && (
          <div className="max-w-4xl mx-auto mb-12 animate-fadeInUp">
            <ProcessingProgress currentPhase={state.currentPhase} progress={state.progress} />
          </div>
        )}

        {/* Error Message */}
        {state.error && (
          <div className="max-w-4xl mx-auto mb-12 p-6 rounded-xl shadow-md animate-slideInDown" style={{ backgroundColor: 'var(--card-bg)', border: '2px solid #ff4444', color: '#ff6666' }}>
            <p className="font-bold text-lg mb-2">Error:</p>
            <p suppressHydrationWarning>{state.error}</p>
          </div>
        )}

        {/* Results Section */}
        {processingComplete && state.summary && (
          <>
            {/* New Article Button */}
            <div className="max-w-7xl mx-auto mb-8 flex justify-end px-8 animate-fadeIn">
              <button
                onClick={() => {
                  setProcessingComplete(false);
                  setShowHighlighting(false);
                  setHasShownHighlighting(false);
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

                  // Smooth scroll back to home
                  setTimeout(() => {
                    const homeSection = document.getElementById('home');
                    if (homeSection) {
                      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="group rounded-full pl-5 pr-1 py-1 flex items-center justify-between overflow-hidden relative"
                style={{
                  backgroundColor: 'var(--navbar-indicator)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--sec)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--navbar-indicator)'}
              >
                {/* Button text */}
                <span className="text-sm font-medium text-[#101010] transition-colors duration-300">
                  New Article
                </span>

                {/* White circle with animated arrow */}
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ml-3">
                  {/* First arrow - moves up-right and fades out on hover */}
                  <svg
                    className="w-3.5 h-3.5 transition-all duration-200 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0"
                    style={{ color: '#101010' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>

                  {/* Second arrow - positioned bottom-left, moves to center and fades in on hover */}
                  <svg
                    className="w-3.5 h-3.5 absolute transition-all duration-200 -translate-x-2 translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ color: 'var(--sec)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </div>
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

                        // Colors that match the interactive highlighter (from highlighter.tsx)
                        const highlightColors: string[] = [
                          "#7AB842", // Green (brand color)
                          "#B89B00", // Gold
                          "#B84D4D", // Coral Red
                          "#38948D", // Turquoise
                          "#6BA298", // Mint
                          "#B85045", // Salmon
                          "#4D43A7", // Purple
                          "#0097B8", // Bright Blue
                          "#B87702", // Orange
                          "#AF4BA1", // Pink
                          "#349EB2", // Sky Blue
                          "#1BA05D", // Emerald Green
                        ];

                        const generateColors = (count: number): string[] => {
                          const colors: string[] = [];
                          for (let i = 0; i < count; i++) {
                            colors.push(highlightColors[i % highlightColors.length]);
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
