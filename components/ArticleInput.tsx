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
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Mode Selection */}
      <div className="flex gap-2 border-b border-gray-300">
        <button
          onClick={() => setInputMode('text')}
          className={`px-4 py-2 font-medium transition-colors ${
            inputMode === 'text'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          disabled={isProcessing}
        >
          Article Text
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`px-4 py-2 font-medium transition-colors ${
            inputMode === 'url'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          disabled={isProcessing}
        >
          Article URL
        </button>
      </div>

      {/* Input Area */}
      {inputMode === 'text' ? (
        <textarea
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          placeholder="Paste your article text here (minimum 130 words)..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          disabled={isProcessing}
        />
      ) : (
        <input
          type="url"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
          placeholder="https://example.com/article"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isProcessing}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isValid && !isProcessing
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isProcessing ? 'Processing...' : 'Generate Summary'}
      </button>

      {/* Info Text */}
      <p className="text-sm text-gray-600 text-center">
        Enter an article (min 130 words) or URL to generate a structured summary with Arabic
        translation
      </p>
    </div>
  );
}
