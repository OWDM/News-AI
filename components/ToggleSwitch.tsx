'use client';

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
}

export default function ToggleSwitch({ enabled, onToggle, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{label}</span>
      )}
      <button
        type="button"
        onClick={onToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none"
        style={{
          backgroundColor: enabled ? 'var(--navbar-indicator)' : 'var(--background)',
          border: '1px solid var(--border-color)',
        }}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
