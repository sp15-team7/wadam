'use client';

import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className='toaster group'
      duration={1500}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-white border-2 border-primary text-black text-4xl shadow-lg rounded-lg p-4 flex items-center gap-3',
          title: 'text-black text-4xl font-medium',
          description: 'text-slate-500 text-sm',
          actionButton:
            'bg-slate-900 text-slate-50 hover:bg-slate-900/90 px-3 py-1 rounded-md text-sm font-medium',
          cancelButton:
            'bg-slate-100 text-slate-500 hover:bg-slate-100/80 px-3 py-1 rounded-md text-sm font-medium',
          success:
            'bg-white border-2 border-primary text-black text-4xl shadow-lg rounded-lg p-4 flex items-center gap-3',
          error:
            'bg-white border-2 border-primary text-black text-4xl shadow-lg rounded-lg p-4 flex items-center gap-3',
          warning:
            'bg-white border-2 border-primary text-black text-4xl shadow-lg rounded-lg p-4 flex items-center gap-3',
          info: 'bg-white border-2 border-primary text-black text-4xl shadow-lg rounded-lg p-4 flex items-center gap-3',
        },
      }}
      {...props}
    />
  );
};

// 완전히 unstyled 버전
const UnstyledToaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'bg-white border-2 border-primary text-black text-4xl rounded-lg shadow-lg p-4 flex items-center gap-3',
          title: 'text-black text-4xl font-medium',
          description: 'text-slate-600 text-xs mt-1',
          success: 'bg-white border-2 border-primary text-black text-4xl',
          error: 'bg-white border-2 border-primary text-black text-4xl',
          warning: 'bg-white border-2 border-primary text-black text-4xl',
          info: 'bg-white border-2 border-primary text-black text-4xl',
          actionButton:
            'bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700',
          cancelButton:
            'border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-slate-50',
        },
      }}
      {...props}
    />
  );
};

export { Toaster, UnstyledToaster };
