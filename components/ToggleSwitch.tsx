'use client';

import { useTranslation } from '@/lib/i18n/useTranslation';

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
}

export default function ToggleSwitch({ enabled, onToggle, label }: ToggleSwitchProps) {
  const t = useTranslation();

  return (
    <div className="inline-flex items-center gap-4 p-4 rounded-xl smooth-transition" style={{
      backgroundColor: 'var(--card-bg)',
      border: '2px solid var(--border-color)'
    }}>
      <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }} suppressHydrationWarning>
        {enabled ? t.toggle.hide : t.toggle.show}
      </span>
      <button
        type="button"
        onClick={onToggle}
        className="relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-500 focus:outline-none"
        style={{
          backgroundColor: enabled ? 'var(--navbar-indicator)' : '#2a2a2a',
        }}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full transition-all duration-500 shadow-md ${
            enabled ? 'translate-x-8 bg-white' : 'translate-x-1 bg-gray-400'
          }`}
          style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        />
      </button>
    </div>
  );
}
