import SignUpForm from '@/feature/auth/components/SignUpForm';
import Logo from '@/shared/components/common/logo';

export default async function SignUpPage() {
  return (
    <main className='flex-center h-dvh w-dvw flex-col'>
      <Logo className='mb-20' />
      <SignUpForm />
    </main>
  );
}
