'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [progress, setProgress] = useState(35);
  const currentPhase = "Extracting key information...";

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--background)' }}>
      {/* Fixed Progress Controller */}
      <div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-xl shadow-xl"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '2px solid var(--navbar-indicator)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-semibold" style={{ color: 'var(--navbar-indicator)' }}>
            {progress}%
          </p>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="h-64"
            style={{
              writingMode: 'vertical-lr',
              direction: 'rtl'
            }}
          />
          <p className="text-xs text-center" style={{ color: 'var(--navbar-white-icon)' }}>
            Adjust
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Progress UI Examples
          </h1>
          <p className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>
            Use the slider on the right to test each design
          </p>
        </div>

        {/* Option 1: Minimal Single Line */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            1. Minimal Single Line
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</span>
                <span style={{ color: 'var(--navbar-indicator)' }}>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--background)' }}>
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%`, backgroundColor: 'var(--navbar-indicator)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Option 2: Loading Dots */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            2. Loading Dots
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '300ms' }}></span>
              </div>
              <span style={{ color: 'var(--foreground)' }}>Processing your article</span>
              <span className="ml-auto" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</span>
            </div>
          </div>
        </div>

        {/* Option 3: Circular Progress */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            3. Circular Progress
          </h2>
          <div className="p-6 rounded-xl flex flex-col items-center" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="var(--background)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="var(--navbar-indicator)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                  className="transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                  {progress}%
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</p>
          </div>
        </div>

        {/* Option 4: Pulsing Bar */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            4. Pulsing Bar
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-2">
              <p className="text-sm" style={{ color: 'var(--foreground)' }}>{currentPhase}</p>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
                <div
                  className="h-full transition-all duration-500 rounded-full animate-pulse"
                  style={{ width: `${progress}%`, backgroundColor: 'var(--navbar-indicator)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Option 5: Stepped Progress */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            5. Stepped Progress
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center justify-between">
              {['Extract', 'Summarize', 'Translate', 'Match'].map((step, idx) => {
                const stepProgress = (idx + 1) * 25;
                const isActive = progress >= stepProgress;
                const isCurrent = progress >= (idx * 25) && progress < stepProgress;

                return (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isCurrent ? 'animate-pulse' : ''}`}
                        style={{
                          backgroundColor: isActive ? 'var(--navbar-indicator)' : 'var(--background)',
                          color: isActive ? '#101010' : 'var(--navbar-white-icon)',
                          border: isCurrent ? '2px solid var(--navbar-indicator)' : 'none'
                        }}
                      >
                        {isActive ? '✓' : idx + 1}
                      </div>
                      <span className="text-xs mt-2" style={{ color: isActive ? 'var(--navbar-indicator)' : 'var(--navbar-white-icon)' }}>
                        {step}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className="flex-1 h-1 mx-2" style={{ backgroundColor: progress > stepProgress ? 'var(--navbar-indicator)' : 'var(--background)' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Option 6: Skeleton Preview */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            6. Skeleton Preview
          </h2>
          <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</span>
              <span className="text-sm" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</span>
            </div>
            <div className="space-y-3">
              <div className="h-6 rounded animate-pulse" style={{ backgroundColor: 'var(--background)', width: '60%' }}></div>
              <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--background)', width: '100%' }}></div>
              <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--background)', width: '90%' }}></div>
              <div className="h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--background)', width: '95%' }}></div>
            </div>
          </div>
        </div>

        {/* Option 7: Gradient Shimmer */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            7. Gradient Shimmer
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-3">
              <p className="text-sm" style={{ color: 'var(--foreground)' }}>{currentPhase}</p>
              <div className="relative w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--navbar-indicator), #c49fff, var(--navbar-indicator))',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite'
                  }}
                />
              </div>
              <style jsx>{`
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Option 8: AI Brain Thinking */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            8. AI Brain Thinking
          </h2>
          <div className="p-6 rounded-xl flex items-center gap-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl animate-pulse" style={{ backgroundColor: 'var(--background)' }}>
                🧠
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: 'var(--navbar-indicator)', color: '#101010' }}>
                {Math.round(progress / 25)}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm mb-2" style={{ color: 'var(--foreground)' }}>AI is thinking...</p>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: progress >= (i + 1) * 25 ? 'var(--navbar-indicator)' : 'var(--background)',
                      transform: progress >= (i + 1) * 25 ? 'scaleY(1.5)' : 'scaleY(1)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Option 9: Document Scanner */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            9. Document Scanner
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative h-32 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
              {/* Document lines */}
              <div className="p-4 space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-2 rounded" style={{ backgroundColor: 'var(--border-color)', width: `${Math.random() * 30 + 70}%` }}></div>
                ))}
              </div>
              {/* Scanning line */}
              <div
                className="absolute left-0 right-0 h-1 shadow-lg transition-all duration-1000"
                style={{
                  top: `${progress}%`,
                  backgroundColor: 'var(--navbar-indicator)',
                  boxShadow: '0 0 20px var(--navbar-indicator)'
                }}
              />
            </div>
            <p className="text-sm mt-3 text-center" style={{ color: 'var(--navbar-white-icon)' }}>
              Scanning article... {progress}%
            </p>
          </div>
        </div>

        {/* Option 10: Liquid Wave */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            10. Liquid Wave
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative h-20 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                style={{
                  height: `${progress}%`,
                  backgroundColor: 'var(--navbar-indicator)',
                  opacity: 0.3
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: `${progress}%`,
                  background: 'linear-gradient(180deg, transparent, var(--navbar-indicator))',
                  animation: 'wave 3s ease-in-out infinite'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold z-10" style={{ color: 'var(--foreground)' }}>
                  {progress}%
                </span>
              </div>
            </div>
            <style jsx>{`
              @keyframes wave {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-20px); }
              }
            `}</style>
          </div>
        </div>

        {/* Option 11: Particle Processor */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            11. Particle Processor
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-32 h-32">
                {[...Array(12)].map((_, i) => {
                  const isActive = i < (progress / 100) * 12;
                  return (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-40px)`,
                        backgroundColor: isActive ? 'var(--navbar-indicator)' : 'var(--background)',
                        boxShadow: isActive ? '0 0 10px var(--navbar-indicator)' : 'none',
                        animation: isActive ? 'pulse 1s ease-in-out infinite' : 'none'
                      }}
                    />
                  );
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-center mt-2" style={{ color: 'var(--navbar-white-icon)' }}>
              {currentPhase}
            </p>
          </div>
        </div>

        {/* Option 12: Glowing Orb */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            12. Glowing Orb
          </h2>
          <div className="p-6 rounded-xl flex flex-col items-center gap-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div
              className="rounded-full transition-all duration-500 flex items-center justify-center"
              style={{
                width: `${40 + (progress * 0.6)}px`,
                height: `${40 + (progress * 0.6)}px`,
                backgroundColor: 'var(--navbar-indicator)',
                boxShadow: `0 0 ${progress / 2}px var(--navbar-indicator)`,
                opacity: 0.3 + (progress / 100) * 0.7
              }}
            >
              <div
                className="rounded-full animate-pulse"
                style={{
                  width: '60%',
                  height: '60%',
                  backgroundColor: 'var(--navbar-indicator)'
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--navbar-indicator)' }}>
                {progress}%
              </p>
              <p className="text-xs" style={{ color: 'var(--navbar-white-icon)' }}>
                {currentPhase}
              </p>
            </div>
          </div>
        </div>

        {/* Option 13: Text Analyzer */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            13. Text Analyzer
          </h2>
          <div className="p-6 rounded-xl space-y-3" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-2">
              {['Extracting content', 'Analyzing structure', 'Generating summary', 'Translating'].map((text, idx) => {
                const stepProgress = (idx + 1) * 25;
                const isActive = progress >= stepProgress;
                const isCurrent = progress >= (idx * 25) && progress < stepProgress;

                return (
                  <div
                    key={text}
                    className="p-2 rounded transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? 'rgba(164, 118, 255, 0.1)' : 'transparent',
                      borderLeft: isCurrent ? '3px solid var(--navbar-indicator)' : '3px solid transparent'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        {isActive ? '✓' : isCurrent ? '⟳' : '○'}
                      </span>
                      <span className={`text-sm ${isCurrent ? 'animate-pulse' : ''}`} style={{ color: isActive || isCurrent ? 'var(--navbar-indicator)' : 'var(--navbar-white-icon)' }}>
                        {text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Option 14: Processing Pipeline */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            14. Processing Pipeline
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-4">
              <div className="text-center text-sm" style={{ color: 'var(--navbar-white-icon)' }}>
                {currentPhase}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1">
                  {[...Array(20)].map((_, i) => {
                    const isActive = i < (progress / 100) * 20;
                    return (
                      <div
                        key={i}
                        className="flex-1 h-8 rounded transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? 'var(--navbar-indicator)' : 'var(--background)',
                          opacity: isActive ? 1 : 0.3,
                          transform: isActive ? 'scaleY(1)' : 'scaleY(0.5)'
                        }}
                      />
                    );
                  })}
                </div>
                <span className="text-lg font-bold w-12 text-right" style={{ color: 'var(--navbar-indicator)' }}>
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Option 15: Minimal Modern */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            15. Minimal Modern
          </h2>
          <div className="p-8 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                {progress}%
              </div>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: 'var(--navbar-indicator)' }}
                />
              </div>
              <p className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>
                {currentPhase}
              </p>
            </div>
          </div>
        </div>

        {/* Option 16: Layered Parallel Bars */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            16. Layered Parallel Bars
          </h2>
          <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm text-center" style={{ color: 'var(--navbar-white-icon)' }}>
              Multi-threaded AI processing
            </p>
            <div className="space-y-2">
              {[1, 0.8, 0.6].map((speed, idx) => (
                <div key={idx} className="relative h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, progress * speed)}%`,
                      backgroundColor: `rgba(164, 118, 255, ${1 - idx * 0.3})`,
                      boxShadow: `0 0 10px rgba(164, 118, 255, ${0.5 - idx * 0.15})`
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-lg font-bold" style={{ color: 'var(--navbar-indicator)' }}>
              {progress}%
            </p>
          </div>
        </div>

        {/* Option 17: Breathing Circle */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            17. Breathing Circle
          </h2>
          <div className="p-6 rounded-xl flex flex-col items-center gap-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative">
              <div
                className="rounded-full transition-all duration-1000"
                style={{
                  width: `${80 + Math.sin(Date.now() / 500) * 20}px`,
                  height: `${80 + Math.sin(Date.now() / 500) * 20}px`,
                  backgroundColor: 'var(--navbar-indicator)',
                  opacity: 0.2,
                  animation: 'breathe 2s ease-in-out infinite'
                }}
              />
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(var(--navbar-indicator) ${progress * 3.6}deg, var(--background) ${progress * 3.6}deg)`
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <span className="text-lg font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
            <style jsx>{`
              @keyframes breathe {
                0%, 100% { transform: scale(0.9); opacity: 0.2; }
                50% { transform: scale(1.1); opacity: 0.4; }
              }
            `}</style>
            <p className="text-xs" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</p>
          </div>
        </div>

        {/* Option 18: Data Stream */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            18. Data Stream
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative h-24 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
              {[...Array(15)].map((_, i) => {
                const isActive = i < (progress / 100) * 15;
                return (
                  <div
                    key={i}
                    className="absolute w-1 rounded-full transition-all duration-500"
                    style={{
                      left: `${i * 6.67}%`,
                      bottom: 0,
                      height: isActive ? `${20 + Math.random() * 80}%` : '0%',
                      backgroundColor: 'var(--navbar-indicator)',
                      opacity: isActive ? 0.3 + Math.random() * 0.7 : 0,
                      transitionDelay: `${i * 50}ms`,
                      animation: isActive ? 'pulse 1.5s ease-in-out infinite' : 'none'
                    }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>Processing data...</span>
              <span className="text-sm font-bold" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</span>
            </div>
          </div>
        </div>

        {/* Option 19: Segmented Ring */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            19. Segmented Ring
          </h2>
          <div className="p-6 rounded-xl flex flex-col items-center gap-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative w-40 h-40">
              <svg className="w-40 h-40 -rotate-90">
                {[...Array(8)].map((_, i) => {
                  const segmentAngle = 45;
                  const gap = 5;
                  const startAngle = i * (segmentAngle + gap);
                  const isActive = i < (progress / 100) * 8;
                  const radius = 60;
                  const circumference = 2 * Math.PI * radius;
                  const segmentLength = (circumference * segmentAngle) / 360;

                  return (
                    <circle
                      key={i}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke={isActive ? 'var(--navbar-indicator)' : 'var(--background)'}
                      strokeWidth="12"
                      strokeDasharray={`${segmentLength} ${circumference}`}
                      strokeDashoffset={-((circumference * startAngle) / 360)}
                      className="transition-all duration-300"
                      style={{
                        filter: isActive ? 'drop-shadow(0 0 6px var(--navbar-indicator))' : 'none'
                      }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                    {progress}%
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--navbar-white-icon)' }}>
                    {Math.ceil((progress / 100) * 8)}/8
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</p>
          </div>
        </div>

        {/* Option 20: Wave Bars */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            20. Wave Bars
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-end justify-center gap-1 h-24">
              {[...Array(25)].map((_, i) => {
                const isActive = i < (progress / 100) * 25;
                const waveHeight = Math.sin(i * 0.5) * 30 + 50;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all duration-300"
                    style={{
                      height: isActive ? `${waveHeight}%` : '10%',
                      backgroundColor: isActive ? 'var(--navbar-indicator)' : 'var(--background)',
                      opacity: isActive ? 0.6 + (i / 25) * 0.4 : 0.3,
                      animation: isActive ? `wave-${i} 2s ease-in-out infinite` : 'none',
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                );
              })}
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-bold" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</p>
              <p className="text-xs mt-1" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</p>
            </div>
          </div>
        </div>

        {/* Option 21: Neural Network */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            21. Neural Network
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative h-32 flex items-center justify-between px-8">
              {/* Input Layer */}
              <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`input-${i}`}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: progress > 0 ? 'var(--navbar-indicator)' : 'var(--background)',
                      boxShadow: progress > 0 ? '0 0 8px var(--navbar-indicator)' : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Hidden Layer */}
              <div className="flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`hidden-${i}`}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: progress > 33 ? 'var(--navbar-indicator)' : 'var(--background)',
                      boxShadow: progress > 33 ? '0 0 8px var(--navbar-indicator)' : 'none',
                      transitionDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>

              {/* Output Layer */}
              <div className="flex flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`output-${i}`}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: progress > 66 ? 'var(--navbar-indicator)' : 'var(--background)',
                      boxShadow: progress > 66 ? '0 0 8px var(--navbar-indicator)' : 'none',
                      transitionDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }}>
                {[...Array(3)].map((_, i) =>
                  [...Array(5)].map((_, j) => (
                    <line
                      key={`line-${i}-${j}`}
                      x1="15%"
                      y1={`${20 + i * 30}%`}
                      x2="50%"
                      y2={`${10 + j * 18}%`}
                      stroke={progress > 33 ? 'var(--navbar-indicator)' : 'var(--border-color)'}
                      strokeWidth="1"
                    />
                  ))
                )}
              </svg>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-bold" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</p>
              <p className="text-xs mt-1" style={{ color: 'var(--navbar-white-icon)' }}>AI Neural Processing</p>
            </div>
          </div>
        </div>

        {/* Option 22: Dual Progress Ring */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            22. Dual Progress Ring
          </h2>
          <div className="p-6 rounded-xl flex flex-col items-center gap-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative w-32 h-32">
              <svg className="transform -rotate-90 w-32 h-32">
                {/* Outer ring */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="var(--background)"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="var(--navbar-indicator)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                  className="transition-all duration-500"
                  strokeLinecap="round"
                  style={{ opacity: 0.5 }}
                />

                {/* Inner ring (animated) */}
                <circle
                  cx="64"
                  cy="64"
                  r="44"
                  stroke="var(--background)"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="44"
                  stroke="var(--navbar-indicator)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - (progress * 1.2) / 100)}`}
                  className="transition-all duration-700"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                  {progress}%
                </span>
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</p>
          </div>
        </div>

        {/* Option 23: Cascading Dots */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            23. Cascading Dots
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex flex-wrap gap-2 justify-center min-h-24 items-center">
              {[...Array(36)].map((_, i) => {
                const isActive = i < (progress / 100) * 36;
                return (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? 'var(--navbar-indicator)' : 'var(--background)',
                      transform: isActive ? 'scale(1.2)' : 'scale(1)',
                      opacity: isActive ? 1 : 0.3,
                      boxShadow: isActive ? '0 0 8px var(--navbar-indicator)' : 'none',
                      transitionDelay: `${i * 20}ms`
                    }}
                  />
                );
              })}
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-bold" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</p>
              <p className="text-xs mt-1" style={{ color: 'var(--navbar-white-icon)' }}>{currentPhase}</p>
            </div>
          </div>
        </div>

        {/* === AI AGENT THEMED DESIGNS === */}

        {/* Option 24: AI Typing Indicator */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            24. AI Typing Indicator
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: 'var(--background)' }}>
                🤖
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ backgroundColor: 'var(--background)' }}>
                  <div className="flex gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: 'var(--navbar-indicator)',
                        animationDelay: '0ms',
                        animationDuration: '1.4s'
                      }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: 'var(--navbar-indicator)',
                        animationDelay: '200ms',
                        animationDuration: '1.4s'
                      }}
                    />
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: 'var(--navbar-indicator)',
                        animationDelay: '400ms',
                        animationDuration: '1.4s'
                      }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: 'var(--navbar-white-icon)' }}>
                    AI is thinking...
                  </span>
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--navbar-indicator)' }}>{progress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Option 25: Claude-Style Status Messages */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            25. Claude-Style Status Messages
          </h2>
          <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--navbar-indicator)' }} />
              <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                {progress < 25 ? 'Pondering, stand by...' :
                 progress < 50 ? 'Analyzing your request...' :
                 progress < 75 ? 'Crafting the response...' :
                 'Almost there...'}
              </p>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--navbar-indicator), #c49fff)',
                  animation: 'shimmer 2s ease-in-out infinite'
                }}
              />
            </div>
            <p className="text-xs text-center" style={{ color: 'var(--navbar-white-icon)' }}>
              {progress}% complete
            </p>
          </div>
        </div>

        {/* Option 26: Token Streaming */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            26. Token Streaming
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>Generating response</span>
                <span className="text-sm font-mono" style={{ color: 'var(--navbar-indicator)' }}>
                  {Math.round(progress * 50)}/5000 tokens
                </span>
              </div>
              <div className="relative h-16 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
                {[...Array(30)].map((_, i) => {
                  const isActive = i < (progress / 100) * 30;
                  return (
                    <div
                      key={i}
                      className="absolute bottom-0 transition-all duration-200"
                      style={{
                        left: `${i * 3.33}%`,
                        width: '2%',
                        height: isActive ? `${30 + Math.random() * 70}%` : '0%',
                        backgroundColor: 'var(--navbar-indicator)',
                        opacity: 0.6,
                        transitionDelay: `${i * 30}ms`
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex gap-1 justify-center">
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--navbar-indicator)' }} />
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '200ms' }} />
                <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Option 27: AI Brain Processing */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            27. AI Brain Processing
          </h2>
          <div className="p-6 rounded-xl flex flex-col items-center gap-4" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="relative">
              <div className="text-6xl animate-pulse">🧠</div>
              {[...Array(6)].map((_, i) => {
                const isActive = i < (progress / 100) * 6;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-50px)`,
                      backgroundColor: isActive ? 'var(--navbar-indicator)' : 'var(--background)',
                      boxShadow: isActive ? '0 0 15px var(--navbar-indicator)' : 'none',
                      opacity: isActive ? 1 : 0.3
                    }}
                  />
                );
              })}
            </div>
            <div className="text-center">
              <p className="text-xl font-bold" style={{ color: 'var(--navbar-indicator)' }}>
                {progress}%
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--navbar-white-icon)' }}>
                Deep thinking mode
              </p>
            </div>
          </div>
        </div>

        {/* Option 28: Multi-Agent Chat */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            28. Multi-Agent Chat
          </h2>
          <div className="p-6 rounded-xl space-y-3" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            {[
              { emoji: '🔍', name: 'Analyzer', threshold: 25 },
              { emoji: '✍️', name: 'Writer', threshold: 50 },
              { emoji: '🌐', name: 'Translator', threshold: 75 },
              { emoji: '✓', name: 'Reviewer', threshold: 100 }
            ].map((agent, idx) => {
              const isActive = progress >= agent.threshold;
              const isCurrent = progress >= (idx > 0 ? [25, 50, 75][idx - 1] : 0) && progress < agent.threshold;

              return (
                <div
                  key={agent.name}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? 'rgba(164, 118, 255, 0.1)' : 'transparent',
                    border: isCurrent ? '1px solid var(--navbar-indicator)' : '1px solid transparent'
                  }}
                >
                  <span className="text-2xl">{agent.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: isActive || isCurrent ? 'var(--navbar-indicator)' : 'var(--navbar-white-icon)' }}>
                      {agent.name}
                    </p>
                    {isCurrent && (
                      <div className="flex gap-1 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: 'var(--navbar-indicator)', animationDelay: '300ms' }} />
                      </div>
                    )}
                  </div>
                  {isActive && <span style={{ color: 'var(--navbar-indicator)' }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Option 29: Conversation Simulation */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            29. Conversation Simulation
          </h2>
          <div className="p-6 rounded-xl space-y-3" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-2">
              {progress >= 20 && (
                <div className="flex gap-2 items-start animate-fadeIn">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--navbar-indicator)' }}>
                    👤
                  </div>
                  <div className="flex-1 p-2 rounded-lg text-xs" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                    Processing your article...
                  </div>
                </div>
              )}
              {progress >= 40 && (
                <div className="flex gap-2 items-start justify-end animate-fadeIn">
                  <div className="flex-1 p-2 rounded-lg text-xs text-right" style={{ backgroundColor: 'var(--navbar-indicator)', color: '#101010' }}>
                    Extracting key information
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--background)' }}>
                    🤖
                  </div>
                </div>
              )}
              {progress >= 60 && (
                <div className="flex gap-2 items-start animate-fadeIn">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--navbar-indicator)' }}>
                    👤
                  </div>
                  <div className="flex-1 p-2 rounded-lg text-xs" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
                    Generating summary...
                  </div>
                </div>
              )}
              {progress >= 80 && (
                <div className="flex gap-2 items-start justify-end animate-fadeIn">
                  <div className="flex-1 p-2 rounded-lg text-xs text-right" style={{ backgroundColor: 'var(--navbar-indicator)', color: '#101010' }}>
                    Almost done! ✨
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: 'var(--background)' }}>
                    🤖
                  </div>
                </div>
              )}
            </div>
            <p className="text-center text-sm font-bold" style={{ color: 'var(--navbar-indicator)' }}>
              {progress}%
            </p>
          </div>
        </div>

        {/* Option 30: LLM Response Streaming */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
            30. LLM Response Streaming
          </h2>
          <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
                  ✨
                </div>
                <div className="flex-1">
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--navbar-indicator), #c49fff, var(--navbar-indicator))',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg min-h-16" style={{ backgroundColor: 'var(--background)' }}>
                <p className="text-xs font-mono" style={{ color: 'var(--foreground)' }}>
                  {progress > 0 && 'The '}
                  {progress > 10 && 'AI '}
                  {progress > 20 && 'is '}
                  {progress > 30 && 'generating '}
                  {progress > 40 && 'your '}
                  {progress > 50 && 'article '}
                  {progress > 60 && 'summary '}
                  {progress > 70 && 'with '}
                  {progress > 80 && 'advanced '}
                  {progress > 90 && 'analysis'}
                  {progress < 100 && (
                    <span className="inline-block w-2 h-4 ml-1 animate-pulse" style={{ backgroundColor: 'var(--navbar-indicator)' }} />
                  )}
                </p>
              </div>
              <p className="text-xs text-center" style={{ color: 'var(--navbar-white-icon)' }}>
                Streaming: {progress}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
