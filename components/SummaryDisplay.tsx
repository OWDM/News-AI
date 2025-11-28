'use client';

import { SentenceMatch } from '@/types';
import { useState, Fragment } from 'react';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface SummaryDisplayProps {
  summary: string;
  arabicSummary: string;
  matches: SentenceMatch[];
  showHighlighting: boolean;
  isFirstTime?: boolean;
}

export default function SummaryDisplay({
  summary,
  arabicSummary,
  matches,
  showHighlighting,
  isFirstTime = false,
}: SummaryDisplayProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const t = useTranslation();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arabicSummary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

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

  // Generate colors for highlighting using the highlighter color palette
  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(highlightColors[i % highlightColors.length]);
    }
    return colors;
  };

  const renderHighlightedText = (text: string) => {
    if (!showHighlighting || !matches || matches.length === 0) {
      return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
    }

    const colors = generateColors(matches.length);
    let remainingText = text;
    const elements: React.ReactNode[] = [];
    let keyCounter = 0;

    matches.forEach((match, index) => {
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

  return (
    <div className="w-full mb-12">
      <div className="max-w-7xl mx-auto p-8 rounded-2xl shadow-lg smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: '2px solid var(--border-color)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
            {t.summary.arabicHeading}
          </h2>
          <button
            onClick={handleCopy}
            className="group relative p-3 rounded-xl smooth-transition overflow-hidden"
            style={{
              backgroundColor: copySuccess ? 'var(--navbar-indicator)' : 'var(--background)',
              border: '1px solid var(--border-color)',
              color: copySuccess ? '#101010' : 'var(--foreground)'
            }}
          >
            <span className="relative z-10 flex items-center">
              {copySuccess ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-700"
              style={{ left: '-100%' }}
            />
          </button>
        </div>
        <div
          className="leading-loose whitespace-pre-wrap"
          dir="rtl"
          style={{ color: 'var(--foreground)', textAlign: 'right', lineHeight: '2' }}
        >
          {(() => {
            const lines = arabicSummary.split('\n').filter(line => line.trim());
            if (lines.length === 0) return renderHighlightedText(arabicSummary);

            const title = lines[0];
            const rest = lines.slice(1).join('\n');

            return (
              <>
                <div className="text-3xl font-bold mb-6" style={{ lineHeight: '1.4' }}>
                  {title}
                </div>
                <div className="text-xl">
                  {renderHighlightedText(rest)}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
