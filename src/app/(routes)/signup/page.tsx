import { SignUpForm } from '@/feature/auth/components/SignUpForm';

export default async function SignUpPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md'>
        <h1 className='text-center text-2xl font-bold'>회원가입</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
