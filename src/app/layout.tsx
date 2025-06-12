import './globals.css';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import QueryProvider from '@/shared/libs/provider/queryProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '와담',
  description: '와인의 미학과 담론, 와담',
  keywords: [
    '와인',
    '와담',
    '와인 리뷰',
    '와인 추천',
    '와인 정보',
    '와인 커뮤니티',
    '코드잇',
    '코드잇 스프린트',
    '코드잇 부트캠프',
    '코드잇 프론트엔드',
    '코드잇 백엔드',
    '코드잇 데이터',
    '코드잇 프로젝트',
    '개발',
    '개발자',
    '개발 프로젝트',
    '개발 팀 프로젝트',
    '프론트엔드',
    '프론트엔드 프로젝트',
  ],
  authors: [{ name: 'sp15-team7', url: 'https://github.com/sp15-team7' }],
  creator: 'sp15-team7',
  publisher: 'sp15-team7',
  applicationName: '와담',
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://wadam.vercel.app',
    title: '와담 | 와인의 미학과 담론',
    description: '와담에서 나만의 와인을 찾아보세요.',
    siteName: '와담',
    images: [
      {
        url: '/images/image-og.png',
        width: 1200,
        height: 630,
        alt: '와담 | 와인의 미학과 담론',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://wadam.vercel.app',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko'>
      <QueryProvider>
        <body className={pretendard.className}>{children}</body>
      </QueryProvider>
    </html>
  );
};

export default RootLayout;
