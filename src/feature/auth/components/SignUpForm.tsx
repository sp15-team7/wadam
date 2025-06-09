'use client';

import { startTransition, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUpAction } from '@/feature/auth/actions/auth.action';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignupSchema,
  SignUpFormData,
} from '@/feature/auth/schema/auth.schema';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='primary'
      size='sm'
      className='flex w-[303px] md:w-[400px] lg:w-[500px] h-[42px] mt-4 text-md-bold px-14'
      disabled={pending}
    >
      {pending ? '가입 진행 중...' : '가입하기'}
    </Button>
  );
};

const SignUpForm = () => {
  const [state, formAction] = useActionState(signUpAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignupSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className='flex min-h-screen items-start justify-center pt-8 md:items-center md:pt-0'>
      <div className='w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] space-y-8 rounded-lg bg-white p-8 md:p-12 lg:p-16'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full px-4'
        >
          <div>
            <label className='text-md-bold md:text-lg-bold lg:text-2lg-bold'>
              이메일
            </label>
            <Input
              {...register('email')}
              type='email'
              placeholder='whyne@email.com'
              className='w-[303px] text-lg-small md:w-[400px] lg:w-[500px] h-[42px] md:h-[52px] rounded-full border px-5 mt-1'
            />
            {errors.email && (
              <p className='text-sm-small text-primary md:text-md-small lg:text-md-small pt-2'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className='text-md-bold md:text-lg-bold lg:text-2lg-bold'>
              닉네임
            </label>
            <Input
              {...register('nickname')}
              placeholder='whyne'
              className='w-[303px] text-lg-small md:w-[400px] lg:w-[500px] h-[42px] md:h-[52px] rounded-full border px-5 mt-1'
            />
            {errors.nickname && (
              <p className='text-sm-small text-primary md:text-md-small lg:text-md-small pt-2'>
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div>
            <label className='text-md-bold md:text-lg-bold lg:text-2lg-bold'>
              비밀번호
            </label>
            <Input
              {...register('password')}
              type='password'
              placeholder='영문, 숫자, 특수문자(!@#$%^&*) 입력'
              className='w-[303px] text-lg-small md:w-[400px] lg:w-[500px] h-[42px] md:h-[52px] rounded-full border px-5 mt-1'
            />
            {errors.password && (
              <p className='text-sm-small text-primary md:text-md-small lg:text-md-small pt-2'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className='text-md-bold md:text-lg-bold lg:text-2lg-bold'>
              비밀번호 확인
            </label>
            <Input
              {...register('passwordConfirmation')}
              type='password'
              placeholder='비밀번호 확인'
              className='w-[303px] text-lg-small md:w-[400px] lg:w-[500px] h-[42px] md:h-[52px] rounded-full border px-5 mt-1'
            />
            {errors.passwordConfirmation && (
              <p className='text-sm-small text-primary md:text-md-small lg:text-md-small pt-2'>
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>
          <SubmitButton />
          {state?.message && (
            <p className='text-destructive text-sm font-medium'>
              {state.message}
            </p>
          )}
        </form>
        <div className='flex flex-row items-center justify-center gap-x-4 mt-2'>
          <span className='text-secondary text-md-small'>
            계정이 이미 있으신가요?
          </span>
          <Link
            href='/signin'
            className='text-primary underline text-md-regular'
          >
            로그인 하러가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
