// src/app/page.tsx
'use client';

import SignInForm from '@/feature/auth/components/SignInForm';

export default function Page() {
  return (
    <main className='flex h-full items-center justify-center'>
      <SignInForm />
    </main>
  );
}
