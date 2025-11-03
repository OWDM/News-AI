import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NewsAI - AI-Powered Newsletter Assistant',
  description: 'Generate structured summaries and Arabic translations of technical articles using AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
