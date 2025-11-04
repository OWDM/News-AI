'use client';

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-20" style={{ backgroundColor: 'var(--component-bg)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>NewsAI</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--navbar-white-icon)' }}>
              AI-powered newsletter creation assistant that extracts technical articles,
              generates structured summaries using RAG, and translates them to Arabic.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Built With</h3>
            <ul className="text-sm space-y-2" style={{ color: 'var(--navbar-white-icon)' }}>
              <li>• Next.js 14 (App Router)</li>
              <li>• TypeScript & Tailwind CSS</li>
              <li>• LangChain.js & OpenAI GPT-4o-mini</li>
              <li>• RAG with MemoryVectorStore</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>Features</h3>
            <ul className="text-sm space-y-2" style={{ color: 'var(--navbar-white-icon)' }}>
              <li>• 4-sentence structured summaries</li>
              <li>• Fine-tuned Arabic translation</li>
              <li>• Intelligent sentence matching</li>
              <li>• Synchronized highlighting</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 text-center" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-sm" style={{ color: 'var(--navbar-white-icon)' }}>
            Developed by Musaed • Powered by OpenAI & LangChain
          </p>
          <p className="text-xs mt-2" style={{ color: '#555' }}>
            Deployed on Vercel • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
