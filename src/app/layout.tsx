import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import QueryProvider from '@/shared/libs/provider/queryProvider';
import { cn } from '@/shared/libs/utils/cn';

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

const toastOptions = {
  classNames: {
    toast: cn(
      '!border-primary !border-2 !bg-white !text-2xl !text-black',
      '!rounded-full !px-8 !py-6 !shadow-lg',
    ),
    title: cn('!text-2xl !font-medium !text-black'),
    description: cn('!text-sm !text-slate-500'),
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko' className={pretendard.variable}>
      <body className={pretendard.className}>
        <QueryProvider>
          <Toaster position='top-center' toastOptions={toastOptions} />
          <SessionProvider>{children}</SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
