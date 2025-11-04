'use client';

import { useState } from 'react';

interface ArticleInputProps {
  onSubmit: (content: string, isUrl: boolean) => void;
  isProcessing: boolean;
}

export default function ArticleInput({ onSubmit, isProcessing }: ArticleInputProps) {
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
  const [articleText, setArticleText] = useState('');
  const [articleUrl, setArticleUrl] = useState('');

  const handleSubmit = () => {
    if (isProcessing) return;

    if (inputMode === 'text') {
      if (articleText.trim()) {
        onSubmit(articleText.trim(), false);
      }
    } else {
      if (articleUrl.trim()) {
        onSubmit(articleUrl.trim(), true);
      }
    }
  };

  const isValid =
    inputMode === 'text' ? articleText.trim().length > 0 : articleUrl.trim().length > 0;

  return (
    <div className="w-full space-y-6 p-8 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      {/* Mode Selection */}
      <div className="flex gap-2 border-b-2" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => setInputMode('text')}
          className={`px-6 py-3 font-semibold transition-all duration-300 ${
            inputMode === 'text'
              ? 'border-b-2 -mb-[2px]'
              : 'hover:opacity-80'
          }`}
          style={{
            color: inputMode === 'text' ? 'var(--navbar-indicator)' : 'var(--navbar-white-icon)',
            borderColor: inputMode === 'text' ? 'var(--navbar-indicator)' : 'transparent',
          }}
          disabled={isProcessing}
        >
          📝 Article Text
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`px-6 py-3 font-semibold transition-all duration-300 ${
            inputMode === 'url'
              ? 'border-b-2 -mb-[2px]'
              : 'hover:opacity-80'
          }`}
          style={{
            color: inputMode === 'url' ? 'var(--navbar-indicator)' : 'var(--navbar-white-icon)',
            borderColor: inputMode === 'url' ? 'var(--navbar-indicator)' : 'transparent',
          }}
          disabled={isProcessing}
        >
          🔗 Article URL
        </button>
      </div>

      {/* Input Area */}
      {inputMode === 'text' ? (
        <textarea
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          placeholder="Paste your article text here (minimum 130 words)..."
          className="w-full h-64 p-5 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none transition-all duration-300 scrollbar-thin"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border-color)',
            color: 'var(--foreground)',
          }}
          disabled={isProcessing}
        />
      ) : (
        <input
          type="url"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
          placeholder="https://example.com/article"
          className="w-full p-5 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border-color)',
            color: 'var(--foreground)',
          }}
          disabled={isProcessing}
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isProcessing}
        className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
        style={{
          backgroundColor: isValid && !isProcessing ? 'var(--navbar-indicator)' : '#2a2a2a',
          color: isValid && !isProcessing ? '#101010' : '#555',
          cursor: !isValid || isProcessing ? 'not-allowed' : 'pointer',
        }}
      >
        {isProcessing ? '⏳ Processing...' : '✨ Generate Summary'}
      </button>

      {/* Info Text */}
      <p className="text-sm text-center leading-relaxed" style={{ color: 'var(--navbar-white-icon)' }}>
        Enter an article (min 130 words) or URL to generate a structured 4-sentence summary with Arabic translation
      </p>
    </div>
  );
}
