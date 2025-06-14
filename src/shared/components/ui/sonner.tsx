'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='top-center'
      duration={1500}
      style={
        {
          '--normal-bg': 'var(--color-white)',
          '--normal-text': 'var(--color-black)',
          '--normal-border': 'var(--color-primary)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
