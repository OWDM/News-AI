'use client';

import { motion, useInView, HTMLMotionProps, Transition } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface HighlightTextProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  text: string;
  color?: string;
  gradient?: string;
  transition?: Transition;
  inView?: boolean;
  inViewMargin?: string;
  inViewOnce?: boolean;
  delay?: number;
  duration?: number;
}

export function HighlightText({
  text,
  color,
  gradient,
  transition,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  delay = 0,
  duration = 1.5,
  className,
  ...props
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: inViewOnce,
  });

  const shouldAnimate = inView ? isInView : true;

  // Create background gradient from color if provided
  const finalGradient = gradient || (color ? `linear-gradient(120deg, ${color} 0%, ${color} 100%)` : 'linear-gradient(120deg, #ffd1dc 0%, #ffd1dc 100%)');

  // Custom transition or default
  const finalTransition = transition || { duration, ease: 'easeInOut' };

  return (
    <motion.span
      ref={ref}
      className={cn('relative', className)}
      style={{
        display: 'inline',
        background: finalGradient,
        backgroundSize: '0% 88%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 85%',
        padding: '2px 0',
        whiteSpace: 'pre-wrap',
      }}
      animate={shouldAnimate ? {
        backgroundSize: ['0% 88%', '100% 88%'],
      } : {}}
      transition={{
        ...finalTransition,
        delay: delay / 1000, // Convert ms to seconds
      }}
      {...props}
    >
      {text}
    </motion.span>
  );
}
