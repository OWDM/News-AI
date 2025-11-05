'use client';

import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
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
