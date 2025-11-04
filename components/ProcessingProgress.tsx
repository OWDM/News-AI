'use client';

interface ProcessingProgressProps {
  currentPhase: string;
  progress: number;
}

export default function ProcessingProgress({ currentPhase, progress }: ProcessingProgressProps) {
  return (
    <div className="w-full space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <span className="inline-block animate-spin">⚙️</span>
            {currentPhase}
          </span>
          <span className="text-lg font-bold text-blue-600">{Math.round(progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Phase Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
          progress >= 25
            ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
            : 'text-gray-400 bg-gray-50'
        }`}>
          <div className="mb-1">{progress >= 25 ? '✓' : '○'}</div>
          Extract Key Info
        </div>
        <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
          progress >= 50
            ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
            : 'text-gray-400 bg-gray-50'
        }`}>
          <div className="mb-1">{progress >= 50 ? '✓' : '○'}</div>
          Generate Summary
        </div>
        <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
          progress >= 75
            ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
            : 'text-gray-400 bg-gray-50'
        }`}>
          <div className="mb-1">{progress >= 75 ? '✓' : '○'}</div>
          Translate Arabic
        </div>
        <div className={`text-center p-3 rounded-lg transition-all duration-300 ${
          progress >= 100
            ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm'
            : 'text-gray-400 bg-gray-50'
        }`}>
          <div className="mb-1">{progress >= 100 ? '✓' : '○'}</div>
          Match Sentences
        </div>
      </div>
    </div>
  );
}
