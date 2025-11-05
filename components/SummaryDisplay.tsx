'use client';

import { SentenceMatch } from '@/types';
import { useState } from 'react';

interface SummaryDisplayProps {
  summary: string;
  arabicSummary: string;
  matches: SentenceMatch[];
  showHighlighting: boolean;
}

export default function SummaryDisplay({
  summary,
  arabicSummary,
  matches,
  showHighlighting,
}: SummaryDisplayProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arabicSummary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
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
      const highlighted = `<span class="highlight-animate" style="background-color: ${color}; padding: 2px 4px; border-radius: 3px;">${sentence}</span>`;
      highlightedText = highlightedText.replace(sentence, highlighted);
    });

    return highlightedText;
  };

  return (
    <div className="w-full mb-8">
      <div className="max-w-7xl mx-auto p-8 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="flex justify-end mb-6">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            style={{ backgroundColor: 'var(--navbar-indicator)', color: '#101010' }}
          >
            {copySuccess ? '✓ تم النسخ' : 'نسخ النص'}
          </button>
        </div>
        <div
          className="leading-loose whitespace-pre-wrap text-lg"
          dir="rtl"
          style={{ color: 'var(--foreground)', textAlign: 'right' }}
        >
          {arabicSummary}
        </div>
      </div>
    </div>
  );
}
