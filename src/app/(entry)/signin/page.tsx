import SignInForm from '@/feature/auth/components/SignInForm';

export default async function SignInPage() {
  return (
    <main className='flex-center h-dvh w-dvw flex-col'>
      <SignInForm />
    </main>
  );
}
