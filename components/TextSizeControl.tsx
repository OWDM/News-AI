'use client';

interface TextSizeControlProps {
  textSize: number;
  onSizeChange: (size: number) => void;
}

export default function TextSizeControl({ textSize, onSizeChange }: TextSizeControlProps) {
  const MIN_SIZE = 50;
  const MAX_SIZE = 150;
  const STEP = 10;

  const handleDecrease = () => {
    if (textSize > MIN_SIZE) {
      onSizeChange(Math.max(MIN_SIZE, textSize - STEP));
    }
  };

  const handleIncrease = () => {
    if (textSize < MAX_SIZE) {
      onSizeChange(Math.min(MAX_SIZE, textSize + STEP));
    }
  };

  return (
    <div className="flex items-center gap-1 p-2 rounded-xl smooth-transition" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      <button
        onClick={handleDecrease}
        disabled={textSize <= MIN_SIZE}
        className="w-8 h-8 flex items-center justify-center rounded-lg smooth-transition"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border-color)',
          color: textSize <= MIN_SIZE ? 'var(--navbar-white-icon)' : 'var(--foreground)',
          opacity: textSize <= MIN_SIZE ? 0.5 : 1,
          cursor: textSize <= MIN_SIZE ? 'not-allowed' : 'pointer',
        }}
      >
        <span className="text-lg font-bold">−</span>
      </button>

      <div className="px-3 text-sm font-medium" style={{ color: 'var(--foreground)', minWidth: '50px', textAlign: 'center' }}>
        {textSize}%
      </div>

      <button
        onClick={handleIncrease}
        disabled={textSize >= MAX_SIZE}
        className="w-8 h-8 flex items-center justify-center rounded-lg smooth-transition"
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border-color)',
          color: textSize >= MAX_SIZE ? 'var(--navbar-white-icon)' : 'var(--foreground)',
          opacity: textSize >= MAX_SIZE ? 0.5 : 1,
          cursor: textSize >= MAX_SIZE ? 'not-allowed' : 'pointer',
        }}
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  );
}
