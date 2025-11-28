'use client';

import { useEffect, useState, useRef } from 'react';

export type FooterCounterStyle = 'inline-text' | 'badge' | 'stat-line' | 'minimal-icon';

interface FooterCounterProps {
  totalCount?: number;
  style: FooterCounterStyle;
}

export default function FooterCounter({ totalCount, style }: FooterCounterProps) {
  const [targetCount, setTargetCount] = useState(totalCount || 0);
  const [displayCount, setDisplayCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch article count from API
  useEffect(() => {
    if (totalCount !== undefined) {
      setTargetCount(totalCount);
      return;
    }

    const fetchCount = async () => {
      try {
        const response = await fetch('/api/article-count');
        const data = await response.json();
        if (data.data && typeof data.data.count === 'number') {
          setTargetCount(data.data.count);
        }
      } catch (error) {
        console.error('Failed to fetch article count:', error);
      }
    };

    fetchCount();
  }, [totalCount]);

  // Animate count whenever targetCount changes
  useEffect(() => {
    if (!mounted || targetCount === 0) {
      setDisplayCount(0);
      return;
    }

    // Start counting animation
    let start = 0;
    const duration = 2000;
    const increment = targetCount / (duration / 16);

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
  }, [targetCount, mounted]);

  // Style 1: Inline Text - Just text, no container
  if (style === 'inline-text') {
    return (
      <p ref={counterRef} className="text-sm" style={{ color: 'var(--navbar-white-icon)' }} suppressHydrationWarning>
        <span style={{ color: 'var(--sec)', fontWeight: 600 }}>
          {displayCount.toLocaleString()}+
        </span>
        {mounted && <>{' '}summaries generated</>}
      </p>
    );
  }

  // Style 2: Badge - Small pill
  if (style === 'badge') {
    return (
      <div
        ref={counterRef}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          backgroundColor: 'rgba(164, 118, 255, 0.1)',
          border: '1px solid var(--sec)',
        }}
      >
        <span className="text-xs font-semibold" style={{ color: 'var(--sec)' }}>
          {displayCount.toLocaleString()}+
        </span>
        {mounted && (
          <span className="text-xs" style={{ color: 'var(--navbar-white-icon)', opacity: 0.8 }}>
            Summaries Generated
          </span>
        )}
      </div>
    );
  }

  // Style 3: Stat Line - Horizontal stat
  if (style === 'stat-line') {
    return (
      <div ref={counterRef} className="flex items-center gap-2">
        <span className="text-2xl font-bold" style={{ color: 'var(--sec)' }}>
          {displayCount.toLocaleString()}+
        </span>
        {mounted && (
          <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
            Summaries Generated
          </span>
        )}
      </div>
    );
  }

  // Style 4: Minimal Icon - Icon + number
  if (style === 'minimal-icon') {
    return (
      <div ref={counterRef} className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="var(--sec)"
        >
          <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path>
        </svg>
        <span className="text-sm font-semibold" style={{ color: 'var(--navbar-white-icon)' }}>
          {displayCount.toLocaleString()}+ generated
        </span>
      </div>
    );
  }

  return null;
}
