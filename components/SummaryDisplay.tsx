'use client';

import { SentenceMatch } from '@/types';
import { useState } from 'react';

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arabicSummary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Generate colors for highlighting (optimized for dark mode)
  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 65%, 40%)`);
    }
    return colors;
  };

  const highlightSummary = () => {
    if (!showHighlighting || !matches || matches.length === 0) {
      return summary;
    }

    const colors = generateColors(matches.length);
    let highlightedText = summary;

    matches.forEach((match, index) => {
      const sentence = match.summary_sentence;
      const color = colors[index];
      const animationDelay = index * 0.8; // 800ms delay between each highlight
      const animationClass = isFirstTime ? 'highlight-animate-first-time' : 'highlight-animate';
      const style = isFirstTime
        ? `background-image: linear-gradient(to right, ${color}, ${color}); animation-delay: ${animationDelay}s;`
        : `background-color: ${color}; padding: 2px 4px; border-radius: 3px;`;
      const highlighted = `<span class="${animationClass}" style="${style}">${sentence}</span>`;
      highlightedText = highlightedText.replace(sentence, highlighted);
    });

    return highlightedText;
  };

  return (
    <div className="w-full mb-12">
      <div className="max-w-7xl mx-auto p-8 rounded-2xl shadow-lg smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="flex justify-between items-center mb-6 pb-4" style={{ borderBottom: '2px solid var(--border-color)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
            Arabic Summary
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
          dangerouslySetInnerHTML={{
            __html: (() => {
              const lines = arabicSummary.split('\n').filter(line => line.trim());
              if (lines.length === 0) return arabicSummary;

              const title = lines[0];
              const rest = lines.slice(1).join('\n');

              return `<div class="text-3xl font-bold mb-6" style="line-height: 1.4;">${title}</div><div class="text-xl">${rest}</div>`;
            })()
          }}
        />
      </div>
    </div>
  );
}
