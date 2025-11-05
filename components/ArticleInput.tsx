'use client';

import { useState, useRef, useEffect } from 'react';

interface ArticleInputProps {
  onSubmit: (content: string, isUrl: boolean) => void;
  isProcessing: boolean;
}

export default function ArticleInput({ onSubmit, isProcessing }: ArticleInputProps) {
  const [input, setInput] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholders = [
    'https://techcrunch.com/article-about-ai',
    'Scientists at MIT developed a new AI system that can predict protein structures...',
    'https://www.nature.com/articles/science-breakthrough',
    'Researchers discovered a quantum algorithm for complex optimization...',
  ];

  // Rotate placeholder every 4 seconds (extended for animation)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Auto-resize textarea based on content (up to 10 lines max)
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = 280; // Approximately 10 lines
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  // Detect URLs in the input
  const detectUrls = (text: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setValidationError(null);

    const urls = detectUrls(value);

    // Check if multiple URLs are present
    if (urls.length > 1) {
      setValidationError('Only one URL is allowed at a time');
    }
  };

  const handleSubmit = () => {
    if (isProcessing) return;

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const urls = detectUrls(trimmedInput);

    // Validation: Check for multiple URLs
    if (urls.length > 1) {
      setValidationError('Only one URL is allowed at a time');
      return;
    }

    // Determine if input is a URL or text
    // If exactly one URL and the trimmed input is just that URL (or URL with minimal whitespace)
    const isUrl = urls.length === 1 && trimmedInput.replace(/\s+/g, '') === urls[0].replace(/\s+/g, '');

    if (isUrl) {
      onSubmit(urls[0], true);
    } else {
      onSubmit(trimmedInput, false);
    }
  };

  const isValid = input.trim().length > 0 && !validationError;

  return (
    <div className="w-full p-8 rounded-2xl shadow-lg smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      {/* Input Area */}
      <div className="relative rounded-xl smooth-transition" style={{
        backgroundColor: 'var(--background)',
      }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          rows={1}
          className="w-full p-5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-fade scrollbar-thin transition-all duration-300"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: validationError ? '#ff4444' : 'var(--border-color)',
            color: 'var(--foreground)',
            minHeight: '56px',
            maxHeight: '280px',
            overflow: 'auto',
            paddingRight: isValid || isProcessing ? '60px' : '20px',
            paddingBottom: '20px',
          }}
          disabled={isProcessing}
        />

        {/* Inline Submit Button - Bottom Right Inside Border */}
        {isValid && !isProcessing && (
          <button
            onClick={handleSubmit}
            className="absolute bottom-4 right-4 p-2.5 rounded-lg smooth-transition hover:scale-110 z-10 animate-scaleIn"
            style={{
              backgroundColor: 'var(--navbar-indicator)',
              color: '#101010',
              boxShadow: '0 2px 8px rgba(169, 255, 91, 0.4)',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>

      {/* Validation Error */}
      {validationError && (
        <p className="text-sm px-2 mt-2 animate-slideInDown" style={{ color: '#ff6666' }}>
          ⚠️ {validationError}
        </p>
      )}

      {/* Info Text */}
      <p className="text-xs mt-3 text-center leading-relaxed" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
        Paste an article (130+ words) or URL to generate an AI-powered summary with Arabic translation
      </p>
    </div>
  );
}
