import { redirect } from 'next/navigation';

import { SignInForm } from '@/feature/auth/components/SignInForm';
import { auth } from '@/feature/auth/libs/auth';

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/wines');
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center'>로그인</h1>
        <SignInForm />
      </div>
    </div>
  );
}
