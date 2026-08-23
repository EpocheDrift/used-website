import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://used.chaostudio.org'),
  title: "Zayn's Moving Sale — Bellevue",
  description:
    'Eleven instruments, electronics, furniture, and everyday objects from Zayn, available in Bellevue through August 31, 2026.',
  openGraph: {
    title: "Zayn's Moving Sale — Bellevue",
    description:
      'Eleven objects available in Bellevue through August 31, 2026.',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/og.png',
        width: 1729,
        height: 910,
        alt: "Zayn's Moving Sale · Bellevue · Through August 31",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zayn's Moving Sale — Bellevue",
    description:
      'Eleven objects available in Bellevue through August 31, 2026.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
