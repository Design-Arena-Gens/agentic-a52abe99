import '@/app/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Crypto Signal Pulse',
  description: 'Dashboard tracking top 20 leveraged crypto signals with actionable insights.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.variable, 'min-h-screen bg-slate-950 text-slate-50')}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
