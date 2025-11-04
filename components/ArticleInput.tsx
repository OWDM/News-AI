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
    <div className="w-full space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Mode Selection */}
      <div className="flex gap-2 border-b-2 border-gray-200">
        <button
          onClick={() => setInputMode('text')}
          className={`px-6 py-3 font-semibold transition-all duration-300 ${
            inputMode === 'text'
              ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
          disabled={isProcessing}
        >
          📝 Article Text
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`px-6 py-3 font-semibold transition-all duration-300 ${
            inputMode === 'url'
              ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
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
          className="w-full h-64 p-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-300 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          disabled={isProcessing}
        />
      ) : (
        <input
          type="url"
          value={articleUrl}
          onChange={(e) => setArticleUrl(e.target.value)}
          placeholder="https://example.com/article"
          className="w-full p-5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          disabled={isProcessing}
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isProcessing}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${
          isValid && !isProcessing
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg transform hover:scale-[1.02]'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isProcessing ? '⏳ Processing...' : '✨ Generate Summary'}
      </button>

      {/* Info Text */}
      <p className="text-sm text-gray-600 text-center leading-relaxed">
        Enter an article (min 130 words) or URL to generate a structured 4-sentence summary with Arabic translation
      </p>
    </div>
  );
}
