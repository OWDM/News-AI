'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-3">NewsAI</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered newsletter creation assistant that extracts technical articles,
              generates structured summaries using RAG, and translates them to Arabic.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-bold mb-3">Built With</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Next.js 14 (App Router)</li>
              <li>• TypeScript & Tailwind CSS</li>
              <li>• LangChain.js & OpenAI GPT-4o-mini</li>
              <li>• RAG with MemoryVectorStore</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-3">Features</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• 4-sentence structured summaries</li>
              <li>• Fine-tuned Arabic translation</li>
              <li>• Intelligent sentence matching</li>
              <li>• Synchronized highlighting</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Developed by Musaed • Powered by OpenAI & LangChain
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Deployed on Vercel • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
