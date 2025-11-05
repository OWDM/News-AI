'use client';

interface ProcessingProgressProps {
  currentPhase: string;
  progress: number;
}

export default function ProcessingProgress({ currentPhase, progress }: ProcessingProgressProps) {
  // Dynamic status messages based on progress
  const getStatusMessage = () => {
    if (progress < 20) return 'Pondering, stand by...';
    if (progress < 40) return 'Extracting key information...';
    if (progress < 60) return 'Analyzing article structure...';
    if (progress < 80) return 'Generating summary...';
    if (progress < 95) return 'Almost there...';
    return 'Finishing up...';
  };

  return (
    <div className="w-full space-y-4 p-6 rounded-2xl shadow-lg smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--navbar-indicator)' }} />
        <p className="text-sm font-medium smooth-transition" style={{ color: 'var(--foreground)' }}>
          {getStatusMessage()}
        </p>
      </div>

      <div className="w-full h-1.5 rounded-full overflow-hidden smooth-transition" style={{ backgroundColor: 'var(--background)' }}>
        <div
          className="h-full transition-all duration-700 ease-out shimmer-progress"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--navbar-indicator), #c49fff)',
            backgroundSize: '200% 100%'
          }}
        />
      </div>

      <p className="text-xs text-center font-semibold smooth-transition" style={{ color: 'var(--navbar-white-icon)' }}>
        {Math.round(progress)}% complete
      </p>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer-progress {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
