'use client';

import { SentenceMatch } from '@/types';
import { Fragment } from 'react';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';

interface ArticleDisplayProps {
  article: string;
  matches: SentenceMatch[];
  showHighlighting: boolean;
  isFirstTime?: boolean;
  fontSize?: number;
}

export default function ArticleDisplay({
  article,
  matches,
  showHighlighting,
  isFirstTime = false,
  fontSize = 1,
}: ArticleDisplayProps) {
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

  const renderHighlightedArticle = (text: string) => {
    if (!showHighlighting || !matches || matches.length === 0) {
      return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
    }

    const colors = generateColors(matches.length);

    // Build a map of all article sentences to their colors and match index
    const sentenceMap: Record<string, { color: string; matchIndex: number }> = {};

    matches.forEach((match, index) => {
      const color = colors[index];
      match.article_sentences.forEach((sentence) => {
        sentenceMap[sentence] = { color, matchIndex: index };
      });
    });

    // Sort sentences by their appearance in the text
    const sortedSentences = Object.keys(sentenceMap).sort((a, b) => {
      return text.indexOf(a) - text.indexOf(b);
    });

    let remainingText = text;
    const elements: React.ReactNode[] = [];
    let keyCounter = 0;

    sortedSentences.forEach((sentence) => {
      const { color, matchIndex } = sentenceMap[sentence];
      const animationDelay = matchIndex * 1200; // 1200ms delay between each color group

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
      >
        {(() => {
          const lines = article.split('\n').filter(line => line.trim());
          if (lines.length === 0) return renderHighlightedArticle(article);

          const title = lines[0];
          const rest = lines.slice(1).join('\n');

          return (
            <>
              <div className="font-bold mb-6 smooth-transition" style={{ lineHeight: '1.4', fontSize: `${3 * fontSize}rem` }}>
                {title}
              </div>
              <div className="smooth-transition" style={{ fontSize: `${1 * fontSize}rem` }}>
                {renderHighlightedArticle(rest)}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
