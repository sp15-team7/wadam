import { SignInForm } from '@/feature/auth/components/SignInForm';

export default async function SignInPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <h1 className='text-center text-2xl font-bold'>로그인</h1>
        <SignInForm />
      </div>
    </div>
  );
}
