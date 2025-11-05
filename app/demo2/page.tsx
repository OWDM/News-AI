'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Highlighter } from '@/components/ui/highlighter';

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

export default function Demo2() {
  // Highlighter settings
  const [action, setAction] = useState<AnnotationAction>('highlight');
  const [color, setColor] = useState('#7AB842');
  const [iterations, setIterations] = useState(2);
  const [key, setKey] = useState(0);

  // Fixed values
  const strokeWidth = 2;
  const animationDuration = 900;
  const padding = 6;
  const delay = 0;
  const multiline = true;

  // Preset colors (30% darker from original)
  const presetColors = [
    { name: 'Green', value: '#7AB842' },
    { name: 'Gold', value: '#B89B00' },
    { name: 'Coral', value: '#B84D4D' },
    { name: 'Turquoise', value: '#38948D' },
    { name: 'Mint', value: '#6BA298' },
    { name: 'Salmon', value: '#B85045' },
    { name: 'Purple', value: '#4D43A7' },
    { name: 'Blue', value: '#0097B8' },
    { name: 'Orange', value: '#B87702' },
    { name: 'Pink', value: '#AF4BA1' },
    { name: 'Sky Blue', value: '#349EB2' },
    { name: 'Emerald', value: '#1BA05D' },
  ];

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Bungee, sans-serif' }}>
            Highlighter Demo
          </h1>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: 'var(--navbar-indicator)',
              color: '#101010',
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Layout: Preview on left, Controls on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Preview Section - Sticky */}
          <div className="lg:sticky lg:top-8 h-fit p-8 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <h2 className="text-2xl font-bold mb-6">Preview</h2>

            {/* Hero Text Preview */}
            <div className="text-center mb-8">
              <p className="text-2xl md:text-3xl leading-relaxed" style={{ color: 'var(--navbar-white-icon)' }}>
                Know exactly where your summary comes from—with{' '}
                <Highlighter
                  key={key}
                  action={action}
                  color={color}
                  strokeWidth={strokeWidth}
                  animationDuration={animationDuration}
                  iterations={iterations}
                  padding={padding}
                  multiline={multiline}
                  isView={false}
                  delay={delay}
                >
                  interactive highlighting
                </Highlighter>
              </p>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-lg transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: 'var(--sec)',
                  color: 'var(--foreground)',
                }}
              >
                ↻ Replay Animation
              </button>
            </div>

            {/* Current Settings Display */}
            <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'var(--background)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-sm font-semibold mb-3 uppercase" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
                Current Settings
              </h3>
              <div className="text-sm space-y-1" style={{ color: 'var(--navbar-white-icon)', fontFamily: 'monospace' }}>
                <div>action: "{action}"</div>
                <div>color: "{color}"</div>
                <div>strokeWidth: {strokeWidth}px (fixed)</div>
                <div>animationDuration: {animationDuration}ms (fixed)</div>
                <div>iterations: {iterations}</div>
                <div>padding: {padding}px (fixed)</div>
                <div>multiline: {multiline.toString()} (fixed)</div>
              </div>
            </div>
          </div>

          {/* Right: Controls Section */}
          <div className="space-y-6">
            {/* Annotation Type */}
            <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <label className="block text-sm font-semibold mb-3 uppercase" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
                Annotation Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['highlight', 'underline', 'box'] as AnnotationAction[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setAction(type)}
                    className="px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: action === type ? 'var(--navbar-indicator)' : 'var(--background)',
                      color: action === type ? '#101010' : 'var(--foreground)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <label className="block text-sm font-semibold mb-3 uppercase" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
                Color
              </label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {presetColors.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setColor(preset.value)}
                    className="w-full aspect-square rounded-lg transition-all duration-300 relative"
                    style={{
                      backgroundColor: preset.value,
                      border: color === preset.value ? '3px solid var(--foreground)' : '1px solid var(--border-color)',
                    }}
                    title={preset.name}
                  >
                    {color === preset.value && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xl">✓</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border-2 focus:outline-none"
                  style={{
                    backgroundColor: 'var(--background)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
            </div>

            {/* Iterations */}
            <div className="p-6 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <label className="block text-sm font-semibold mb-3 uppercase" style={{ color: 'var(--navbar-white-icon)', opacity: 0.7 }}>
                Iterations
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map((iter) => (
                  <button
                    key={iter}
                    onClick={() => setIterations(iter)}
                    className="px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: iterations === iter ? 'var(--navbar-indicator)' : 'var(--background)',
                      color: iterations === iter ? '#101010' : 'var(--foreground)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {iter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
