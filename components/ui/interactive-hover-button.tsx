'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export function InteractiveHoverButton({
  text = 'Button',
  className,
  children,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        'group relative w-full cursor-pointer overflow-hidden rounded-full font-medium transition-all duration-300',
        'hover:shadow-xl',
        className
      )}
      style={{
        backgroundColor: 'var(--navbar-indicator)',
      }}
      {...props}
    >
      {/* Animated background that slides in from left on hover */}
      <span
        className="absolute inset-0 w-0 transition-all duration-500 ease-out group-hover:w-full"
        style={{
          backgroundColor: 'var(--sec)',
        }}
      />

      {/* Button content */}
      <span className="relative flex items-center justify-center px-6 py-3 text-base text-[#101010] transition-colors duration-300">
        {children || text}
      </span>
    </button>
  );
}
