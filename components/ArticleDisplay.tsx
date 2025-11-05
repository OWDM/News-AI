'use client';

import { SentenceMatch } from '@/types';

interface ArticleDisplayProps {
  article: string;
  matches: SentenceMatch[];
  showHighlighting: boolean;
  isFirstTime?: boolean;
}

export default function ArticleDisplay({
  article,
  matches,
  showHighlighting,
  isFirstTime = false,
}: ArticleDisplayProps) {
  // Generate colors for highlighting (optimized for dark mode)
  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count;
      colors.push(`hsl(${hue}, 65%, 40%)`);
    }
    return colors;
  };

  const highlightArticle = () => {
    let highlightedText = article;

    if (showHighlighting && matches && matches.length > 0) {
      const colors = generateColors(matches.length);

      // Build a map of all article sentences to their colors and match index
      const sentenceMap: Record<string, { color: string; matchIndex: number }> = {};

      matches.forEach((match, index) => {
        const color = colors[index];
        match.article_sentences.forEach((sentence) => {
          sentenceMap[sentence] = { color, matchIndex: index };
        });
      });

      // Highlight all matching sentences with staggered animation based on match index
      Object.entries(sentenceMap).forEach(([sentence, { color, matchIndex }]) => {
        const animationDelay = matchIndex * 0.8; // 800ms delay between each highlight group
        const animationClass = isFirstTime ? 'highlight-animate-first-time' : 'highlight-animate';
        const style = isFirstTime
          ? `background-image: linear-gradient(to right, ${color}, ${color}); animation-delay: ${animationDelay}s;`
          : `background-color: ${color}; padding: 2px 4px; border-radius: 3px;`;
        const highlighted = `<span class="${animationClass}" style="${style}">${sentence}</span>`;
        highlightedText = highlightedText.replace(sentence, highlighted);
      });
    }

    // Make first line (title) larger
    const lines = highlightedText.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      const title = lines[0];
      const rest = lines.slice(1).join('\n');
      return `<div class="text-3xl font-bold mb-6" style="line-height: 1.4;">${title}</div><div class="text-base">${rest}</div>`;
    }

    return highlightedText;
  };

  return (
    <div className="p-8 rounded-2xl shadow-lg smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      <h2 className="text-xs font-semibold uppercase tracking-wider mb-6 pb-4" style={{
        color: 'var(--navbar-white-icon)',
        opacity: 0.7,
        borderBottom: '2px solid var(--border-color)'
      }}>
        Original Article
      </h2>
      <div
        className="leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto pr-4 scrollbar-thin text-base"
        style={{ color: 'var(--foreground)' }}
        dangerouslySetInnerHTML={{ __html: highlightArticle() }}
      />
    </div>
  );
}
