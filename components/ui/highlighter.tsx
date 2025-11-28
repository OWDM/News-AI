"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useInView } from "framer-motion"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  delay?: number
  randomize?: boolean
}

// Only use these 3 annotation types for randomization
const readableAnnotations: AnnotationAction[] = [
  "highlight",
  "underline",
  "box",
]

// Colors that work well with white text and provide good visibility (30% darker from original)
const readableColors: string[] = [
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
]

// Function to get random annotation type
const getRandomAnnotation = (): AnnotationAction => {
  const randomIndex = Math.floor(Math.random() * readableAnnotations.length)
  return readableAnnotations[randomIndex]
}

// Function to get random color
const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * readableColors.length)
  return readableColors[randomIndex]
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  delay = 0,
  randomize = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const [selectedAction] = useState<AnnotationAction>(() =>
    randomize ? getRandomAnnotation() : action
  )
  const [selectedColor] = useState<string>(() =>
    randomize ? getRandomColor() : color
  )

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useEffect(() => {
    if (!shouldShow) return

    const element = elementRef.current
    if (!element) return

    let hideTimeoutId: NodeJS.Timeout | null = null
    let eraseAnimationId: number | null = null

    // Add delay before showing annotation
    const timeoutId = setTimeout(() => {
      const annotationConfig = {
        type: selectedAction,
        color: selectedColor,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const annotation = annotate(element, annotationConfig)

      annotationRef.current = annotation
      annotationRef.current.show()

      // Reverse animation (erasing effect) after 1.5 seconds
      hideTimeoutId = setTimeout(() => {
        // Find the SVG element - try multiple methods
        let svg = element.nextElementSibling as SVGElement

        // If nextSibling doesn't work, try looking in parent
        if (!svg || svg.tagName !== 'svg') {
          const parent = element.parentElement
          if (parent) {
            svg = parent.querySelector('svg') as SVGElement
          }
        }

        // Try looking for ANY svg near this element
        if (!svg || svg.tagName !== 'svg') {
          const allSvgs = document.querySelectorAll('svg')
          // Find SVG that's positioned near our element
          const rect = element.getBoundingClientRect()
          svg = Array.from(allSvgs).find(s => {
            const svgRect = s.getBoundingClientRect()
            return Math.abs(svgRect.left - rect.left) < 10 &&
                   Math.abs(svgRect.top - rect.top) < 10
          }) as SVGElement
        }

        console.log('Attempting to erase:', {
          selectedAction,
          svgExists: !!svg,
          svgTagName: svg?.tagName,
        })

        if (svg && svg.tagName === 'svg') {
          // Simple approach: fade out the entire SVG
          svg.style.transition = `opacity ${animationDuration}ms ease-in`

          requestAnimationFrame(() => {
            svg.style.opacity = '0'
            console.log('Set opacity to 0 for', selectedAction)
          })

          // Remove annotation after fade completes
          setTimeout(() => {
            console.log('Removing annotation for', selectedAction)
            if (annotationRef.current) {
              annotationRef.current.remove()
            }
          }, animationDuration + 100)
        } else {
          console.log('SVG not found or wrong tag! Element:', element)
        }
      }, 1500)

      // Setup resize observer after annotation is created
      const resizeObserver = new ResizeObserver(() => {
        if (annotationRef.current) {
          annotationRef.current.hide()
          annotationRef.current.show()
        }
      })

      resizeObserver.observe(element)
      resizeObserver.observe(document.body)

      // Store cleanup function
      return () => {
        resizeObserver.disconnect()
      }
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId)
      }
      if (eraseAnimationId) {
        cancelAnimationFrame(eraseAnimationId)
      }
      if (element && annotationRef.current) {
        annotate(element, { type: selectedAction }).remove()
      }
    }
  }, [
    shouldShow,
    selectedAction,
    selectedColor,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    delay,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
