import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import GitHubCorner from '@/components/GitHubCorner';
import { WebViewProvider } from '@/providers/WebViewProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import '../globals.css';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://12factor.me'),
    icons: {
      icon: [
        { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/favicon.png',
    },
    // Additional metadata for better SEO and social sharing
    keywords: [
      '12Factor',
      'programming methodology',
      'AI collaboration',
      'software development',
      'coding principles',
      'development practices',
      'interactive learning',
      'programming education'
    ],
    authors: [{ name: 'wquguru', url: 'https://twitter.com/wquguru' }],
    creator: 'wquguru',
    publisher: '12Factor.me',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <WebViewProvider>
          <div className="min-h-screen bg-bg">
            <Navigation />
            <GitHubCorner />
            <main>{children}</main>
          </div>
        </WebViewProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}