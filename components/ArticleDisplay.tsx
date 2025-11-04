'use client';

import { SentenceMatch } from '@/types';

interface ArticleDisplayProps {
  article: string;
  matches: SentenceMatch[];
  showHighlighting: boolean;
}

export default function ArticleDisplay({
  article,
  matches,
  showHighlighting,
}: ArticleDisplayProps) {
  // Generate colors for highlighting (HSV-based like Python version)
  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 70%, 80%)`);
    }
    return colors;
  };

  const highlightArticle = () => {
    if (!showHighlighting || !matches || matches.length === 0) {
      return article;
    }

    const colors = generateColors(matches.length);
    let highlightedText = article;

    // Build a map of all article sentences to their colors
    const sentenceColorMap: Record<string, string> = {};

    matches.forEach((match, index) => {
      const color = colors[index];
      match.article_sentences.forEach((sentence) => {
        sentenceColorMap[sentence] = color;
      });
    });

    // Highlight all matching sentences
    Object.entries(sentenceColorMap).forEach(([sentence, color]) => {
      const highlighted = `<span class="highlight-animate" style="background-color: ${color}; padding: 2px 4px; border-radius: 3px;">${sentence}</span>`;
      highlightedText = highlightedText.replace(sentence, highlighted);
    });

    return highlightedText;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">📄</span>
        Original Article
      </h2>
      <div
        className="leading-relaxed text-gray-800 whitespace-pre-wrap max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        dangerouslySetInnerHTML={{ __html: highlightArticle() }}
      />
    </div>
  );
}
