"use client";

import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

type AnimationType = "blurInUp" | "blurIn" | "fadeIn" | "slideUp" | "slideDown";
type SegmentationType = "character" | "word" | "line";

interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: SegmentationType;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

const animations: Record<AnimationType, { initial: any; animate: any }> = {
  blurInUp: {
    initial: {
      filter: "blur(10px)",
      opacity: 0,
      y: 20,
    },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
    },
  },
  blurIn: {
    initial: {
      filter: "blur(10px)",
      opacity: 0,
    },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
    },
  },
  fadeIn: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  slideUp: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  slideDown: {
    initial: {
      opacity: 0,
      y: -20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
};

function splitTextByType(text: string, by: SegmentationType): string[] {
  switch (by) {
    case "character":
      return text.split("");
    case "word":
      return text.split(" ");
    case "line":
      return text.split("\n");
    default:
      return [text];
  }
}

export function TextAnimate({
  children,
  animation = "fadeIn",
  by = "word",
  as: Tag = "div",
  className = "",
  style,
  once = true,
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03,
}: TextAnimateProps) {
  const segments = useMemo(() => splitTextByType(children, by), [children, by]);
  const selectedAnimation = animations[animation];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: selectedAnimation.initial,
    visible: {
      ...selectedAnimation.animate,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  // If animating by line, wrap each line in its own container
  if (by === "line") {
    return (
      <Tag className={className} style={style}>
        {segments.map((line, lineIndex) => (
          <motion.span
            key={lineIndex}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            viewport={{ once }}
            style={{ display: "block" }}
          >
            <motion.span
              variants={itemVariants}
              style={{ display: "block" }}
            >
              {line}
            </motion.span>
          </motion.span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} style={style}>
      <motion.span
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        viewport={{ once }}
        style={{ display: "inline-block" }}
      >
        {segments.map((segment, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{ display: "inline-block" }}
          >
            {segment === " " ? "\u00A0" : segment}
            {by === "word" && index < segments.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
