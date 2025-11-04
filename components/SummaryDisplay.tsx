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

  // Generate colors for highlighting (HSV-based like Python version)
  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 80%)`);
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
      <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">🇸🇦</span>
            الملخص بالعربية
          </h2>
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {copySuccess ? '✓ تم النسخ' : 'نسخ النص'}
          </button>
        </div>
        <div className="text-right leading-loose text-gray-800 whitespace-pre-wrap text-lg">
          {arabicSummary}
        </div>
      </div>
    </div>
  );
}
