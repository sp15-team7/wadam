// 📜 feature/auth/components/SignInForm.tsx (초간단 버전)

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signInAction } from '@/feature/auth/actions/auth.action';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  );
}

export function SignInForm() {
  const [state, formAction] = useFormState(signInAction, null);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='email'>이메일</Label>
        <Input id='email' name='email' type='email' required />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>비밀번호</Label>
        <Input id='password' name='password' type='password' required />
      </div>
      {state?.message && (
        <p className='text-sm font-medium text-destructive'>{state.message}</p>
      )}
      <SubmitButton />
    </form>
  );
}
