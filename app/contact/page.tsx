'use client';

import { useEffect } from 'react';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
  // Always scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--background)' }}>
      {/* Contact Section */}
      <section className="flex-1 flex flex-col justify-center py-16">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
