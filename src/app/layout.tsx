import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import QueryProvider from '@/shared/libs/provider/queryProvider';

export const metadata: Metadata = {
  title: 'WADAM',
  description: 'WADAM Application',
};

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko' className={pretendard.variable}>
      <body className={pretendard.className}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
