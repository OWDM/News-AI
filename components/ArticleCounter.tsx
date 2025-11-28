'use client';

import { useEffect, useState } from 'react';

interface ArticleCounterProps {
  totalCount?: number; // Optional: for API integration later
}

export default function ArticleCounter({ totalCount }: ArticleCounterProps) {
  // Mock data for now - will be replaced with API call later
  const targetCount = totalCount || 1247; // Starting placeholder number
  const [displayCount, setDisplayCount] = useState(0);

  // Counting animation on mount
  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = targetCount / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setDisplayCount(targetCount);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetCount]);

  return (
    <div
      className="flex items-center gap-4 px-6 py-3 rounded-2xl"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl"
        style={{
          backgroundColor: 'var(--navbar-indicator)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#101010"
        >
          <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
        </svg>
      </div>

      {/* Counter Display */}
      <div className="flex flex-col">
        <span
          className="text-3xl md:text-4xl font-bold"
          style={{
            background: 'linear-gradient(135deg, var(--navbar-indicator) 0%, var(--sec) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {displayCount.toLocaleString()}+
        </span>
        <span
          className="text-sm font-medium uppercase tracking-wider"
          style={{
            color: 'var(--navbar-white-icon)',
            opacity: 0.7
          }}
        >
          Articles Generated
        </span>
      </div>
    </div>
  );
}
