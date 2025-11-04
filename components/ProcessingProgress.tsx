'use client';

interface ProcessingProgressProps {
  currentPhase: string;
  progress: number;
}

export default function ProcessingProgress({ currentPhase, progress }: ProcessingProgressProps) {
  return (
    <div className="w-full space-y-6 p-8 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
            <span className="inline-block animate-spin">⚙️</span>
            {currentPhase}
          </span>
          <span className="text-lg font-bold" style={{ color: 'var(--navbar-indicator)' }}>{Math.round(progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: 'var(--background)' }}>
          <div
            className="h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%`, backgroundColor: 'var(--navbar-indicator)' }}
          />
        </div>
      </div>

      {/* Phase Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="text-center p-3 rounded-lg transition-all duration-300" style={{
          backgroundColor: progress >= 25 ? 'var(--navbar-indicator)' : 'var(--background)',
          color: progress >= 25 ? '#101010' : 'var(--navbar-white-icon)',
          fontWeight: progress >= 25 ? '600' : 'normal',
        }}>
          <div className="mb-1">{progress >= 25 ? '✓' : '○'}</div>
          Extract Key Info
        </div>
        <div className="text-center p-3 rounded-lg transition-all duration-300" style={{
          backgroundColor: progress >= 50 ? 'var(--navbar-indicator)' : 'var(--background)',
          color: progress >= 50 ? '#101010' : 'var(--navbar-white-icon)',
          fontWeight: progress >= 50 ? '600' : 'normal',
        }}>
          <div className="mb-1">{progress >= 50 ? '✓' : '○'}</div>
          Generate Summary
        </div>
        <div className="text-center p-3 rounded-lg transition-all duration-300" style={{
          backgroundColor: progress >= 75 ? 'var(--navbar-indicator)' : 'var(--background)',
          color: progress >= 75 ? '#101010' : 'var(--navbar-white-icon)',
          fontWeight: progress >= 75 ? '600' : 'normal',
        }}>
          <div className="mb-1">{progress >= 75 ? '✓' : '○'}</div>
          Translate Arabic
        </div>
        <div className="text-center p-3 rounded-lg transition-all duration-300" style={{
          backgroundColor: progress >= 100 ? 'var(--navbar-indicator)' : 'var(--background)',
          color: progress >= 100 ? '#101010' : 'var(--navbar-white-icon)',
          fontWeight: progress >= 100 ? '600' : 'normal',
        }}>
          <div className="mb-1">{progress >= 100 ? '✓' : '○'}</div>
          Match Sentences
        </div>
      </div>
    </div>
  );
}
