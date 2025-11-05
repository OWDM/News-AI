'use client';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-20" style={{ backgroundColor: 'var(--component-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/newsai-logo.png"
            alt="News AI Logo"
            className="w-10 h-10 object-contain"
          />
          <p className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>
            Developed by Musaed
          </p>
          <p className="text-xs" style={{ color: '#555', fontFamily: 'Bungee, sans-serif' }}>
            {new Date().getFullYear()} News AI
          </p>
        </div>
      </div>
    </footer>
  );
}
