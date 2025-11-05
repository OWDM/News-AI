import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'News AI - AI-Powered Newsletter Assistant',
  description: 'Generate structured summaries and Arabic translations of technical articles using AI',
  icons: {
    icon: '/newsai-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
