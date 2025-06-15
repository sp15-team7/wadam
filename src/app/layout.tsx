import './globals.css';

import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import QueryProvider from '@/shared/libs/provider/queryProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko'>
      <QueryProvider>
        <body className={pretendard.className}>
          <Toaster />
          {children}
        </body>
      </QueryProvider>
    </html>
  );
};

export default RootLayout;
