'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { signUpAction } from '@/feature/auth/actions/auth.action';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? '가입 진행 중...' : '가입하기'}
    </Button>
  );
}

export function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, null);

  return (
    <form action={formAction} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>이메일</Label>
        <Input id='email' name='email' type='email' required />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='nickname'>닉네임</Label>
        <Input id='nickname' name='nickname' required maxLength={20} />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>비밀번호</Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          minLength={8}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='passwordConfirmation'>비밀번호 확인</Label>
        <Input
          id='passwordConfirmation'
          name='passwordConfirmation'
          type='password'
          required
          minLength={8}
        />
      </div>

      {state?.message && (
        <p className='text-sm font-medium text-destructive'>{state.message}</p>
      )}
      <SubmitButton />
    </form>
  );
}
