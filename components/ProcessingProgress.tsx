'use client';

interface ProcessingProgressProps {
  currentPhase: string;
  progress: number;
}

export default function ProcessingProgress({ currentPhase, progress }: ProcessingProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{currentPhase}</span>
          <span className="text-sm font-medium text-blue-600">{Math.round(progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Phase Indicators */}
      <div className="grid grid-cols-4 gap-2 text-xs text-center">
        <div className={progress >= 25 ? 'text-blue-600 font-medium' : 'text-gray-400'}>
          Extract Key Info
        </div>
        <div className={progress >= 50 ? 'text-blue-600 font-medium' : 'text-gray-400'}>
          Generate Summary
        </div>
        <div className={progress >= 75 ? 'text-blue-600 font-medium' : 'text-gray-400'}>
          Translate Arabic
        </div>
        <div className={progress >= 100 ? 'text-blue-600 font-medium' : 'text-gray-400'}>
          Match Sentences
        </div>
      </div>
    </div>
  );
}
