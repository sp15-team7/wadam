// src/feature/auth/components/SignInForm.tsx

/**
 * @author: Jin
 * @since: 2025-06-10
 * @description: 로그인 폼 컴포넌트 (react-hook-form -> zod -> server action)
 *
 * handleSubmit: 폼 제출 시 동작, onSubmit 함수 호출
 * formState: 폼 상태관리 저장, 잘못된 정보 입력 시 errors 객체에 저장
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useActionState } from 'react';
import { useForm } from 'react-hook-form';

import { signInAction } from '@/feature/auth/actions/auth.action';
import {
  signInSchema,
  type SignInFormData,
} from '@/feature/auth/schema/auth.schema';

import { Button } from '../../../shared/components/ui/button';
import AuthLink from './AuthLink';
import ErrorMessage from './ErrorMessage';
import FormField from './FormField';
import SubmitButton from './buttons/SubmitButton';

const SignInForm: () => JSX.Element = () => {
  const [state, formAction] = useActionState(signInAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formAction(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex-center flex h-[67.9rem] w-[34.3rem] flex-col gap-5 px-4 md:h-[76.2rem] md:w-[49.6rem] lg:h-[79.4rem] lg:w-[50rem]'
    >
      <FormField<SignInFormData>
        label='이메일'
        name='email'
        type='email'
        placeholder='이메일 입력'
        register={register}
        errors={errors}
      />

      <FormField<SignInFormData>
        label='비밀번호'
        name='password'
        type='password'
        placeholder='비밀번호 입력'
        register={register}
        errors={errors}
      />

      <SubmitButton>로그인</SubmitButton>
      <Button
        size='full'
        className='bg-[#FFDB00] !text-black hover:bg-[#FFDB00]/60'
      >
        카카오로 시작하기
      </Button>

      {state?.message && <ErrorMessage message={state.message} />}

      <AuthLink
        label='계정이 없으신가요?'
        linkText='회원가입하기'
        href='/signup'
      />
    </form>
  );
};

export default SignInForm;
