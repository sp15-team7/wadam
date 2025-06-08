import { redirect } from 'next/navigation';
import { SignUpForm } from '@/feature/auth/components/SignUpForm';
import { auth } from '@/feature/auth/libs/auth';

export default async function SignUpPage() {
  const session = await auth();
  if (session?.user) redirect('/wines');
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center'>회원가입</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
