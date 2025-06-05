import QueryProvider from '@/shared/libs/provider/queryProvider';
import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '와담',
  description: '와인의 미학과 담론, 와담',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='kr'>
      <QueryProvider>
        <body className={pretendard.className}>{children}</body>
      </QueryProvider>
    </html>
  );
};

export default RootLayout;
