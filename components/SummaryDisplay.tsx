'use client';

import { SentenceMatch } from '@/types';
import { useState, Fragment } from 'react';
import { HighlightText } from '@/components/animate-ui/primitives/texts/highlight';

interface SummaryDisplayProps {
  summary: string;
  arabicSummary: string;
  matches: SentenceMatch[];
  showHighlighting: boolean;
  isFirstTime?: boolean;
  onArabicSummaryChange?: (newSummary: string) => void;
  fontSize?: number;
  onIncreaseFontSize?: () => void;
  onDecreaseFontSize?: () => void;
  onResetFontSize?: () => void;
}

export default function SummaryDisplay({
  summary,
  arabicSummary,
  matches,
  showHighlighting,
  isFirstTime = false,
  onArabicSummaryChange,
  fontSize = 1,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onResetFontSize,
}: SummaryDisplayProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(arabicSummary);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedText : arabicSummary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleAdjust = () => {
    if (isEditing) {
      // Save changes
      if (onArabicSummaryChange) {
        onArabicSummaryChange(editedText);
      }
      setIsEditing(false);
    } else {
      // Enter edit mode
      setEditedText(arabicSummary);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedText(arabicSummary);
    setIsEditing(false);
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
        <div className="flex justify-between items-start mb-6 pb-4" style={{ borderBottom: '2px solid var(--border-color)' }}>
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
            Arabic Summary
          </h2>
          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-1.5 pt-0.5">
              <div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
                <button
                  onClick={onDecreaseFontSize}
                  className="group relative p-1.5 rounded-md smooth-transition"
                  style={{
                    backgroundColor: fontSize <= 0.8 ? 'transparent' : 'var(--background)',
                    color: 'var(--foreground)',
                    opacity: fontSize <= 0.8 ? 0.4 : 1,
                    cursor: fontSize <= 0.8 ? 'not-allowed' : 'pointer'
                  }}
                  disabled={fontSize <= 0.8}
                  title="Decrease font size"
                >
                  <span className="flex items-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                    </svg>
                  </span>
                </button>
                <button
                  onClick={onResetFontSize}
                  className="group relative px-3 py-1 rounded-md smooth-transition text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    opacity: fontSize === 1 ? 0.5 : 1,
                    cursor: fontSize === 1 ? 'not-allowed' : 'pointer',
                    minWidth: '42px'
                  }}
                  disabled={fontSize === 1}
                  title="Reset to default"
                >
                  <span>{Math.round(fontSize * 100)}%</span>
                </button>
                <button
                  onClick={onIncreaseFontSize}
                  className="group relative p-1.5 rounded-md smooth-transition"
                  style={{
                    backgroundColor: fontSize >= 1.5 ? 'transparent' : 'var(--background)',
                    color: 'var(--foreground)',
                    opacity: fontSize >= 1.5 ? 0.4 : 1,
                    cursor: fontSize >= 1.5 ? 'not-allowed' : 'pointer'
                  }}
                  disabled={fontSize >= 1.5}
                  title="Increase font size"
                >
                  <span className="flex items-center">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
              </div>
              <span className="text-center text-xs" style={{ color: 'var(--navbar-white-icon)', opacity: 0.5, fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                FONT SIZE
              </span>
            </div>
            <div className="flex gap-3">
            {isEditing && (
              <button
                onClick={handleCancel}
                className="group relative p-3 rounded-xl smooth-transition overflow-hidden"
                style={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--foreground)'
                }}
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-700"
                  style={{ left: '-100%' }}
                />
              </button>
            )}
            <button
              onClick={handleAdjust}
              className="group relative p-3 rounded-xl smooth-transition overflow-hidden"
              style={{
                backgroundColor: isEditing ? 'var(--navbar-indicator)' : 'var(--background)',
                border: '1px solid var(--border-color)',
                color: isEditing ? '#101010' : 'var(--foreground)'
              }}
            >
              <span className="relative z-10 flex items-center">
                {isEditing ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                )}
              </span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-700"
                style={{ left: '-100%' }}
              />
            </button>
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
          </div>
        </div>
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            dir="rtl"
            className="w-full p-4 rounded-xl smooth-transition focus:outline-none"
            style={{
              minHeight: '300px',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border-color)',
              color: 'var(--foreground)',
              fontSize: `${1.125 * fontSize}rem`,
              lineHeight: '2',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--sec)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
            }}
          />
        ) : (
          <div
            className="leading-loose whitespace-pre-wrap smooth-transition"
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
                  <div className="font-bold mb-6 smooth-transition" style={{ lineHeight: '1.4', fontSize: `${3 * fontSize}rem` }}>
                    {title}
                  </div>
                  <div className="smooth-transition" style={{ fontSize: `${1.25 * fontSize}rem` }}>
                    {renderHighlightedText(rest)}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
