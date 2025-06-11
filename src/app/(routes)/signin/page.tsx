// src/app/(auth)/signin/page.tsx

import SignInForm from '@/feature/auth/components/SignInForm';

export default async function SignInPage() {
  return (
    <div className='flex-center h-dvh w-dvw'>
      <SignInForm />
    </div>
  );
}
