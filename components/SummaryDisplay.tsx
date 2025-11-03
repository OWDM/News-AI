'use client';

import { SentenceMatch } from '@/types';
import { useEffect, useState } from 'react';

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
      const highlighted = `<span style="background-color: ${color}; padding: 2px 4px; border-radius: 3px;">${sentence}</span>`;
      highlightedText = highlightedText.replace(sentence, highlighted);
    });

    return highlightedText;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Arabic Summary */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Arabic Summary</h2>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        <div className="text-right leading-relaxed text-gray-800 whitespace-pre-wrap">
          {arabicSummary}
        </div>
      </div>

      {/* English Summary */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">English Summary</h2>
        <div
          className="leading-relaxed text-gray-800 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: highlightSummary() }}
        />
      </div>
    </div>
  );
}
