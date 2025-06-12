// src/feature/auth/components/SignInForm.tsx

/**
 * @author: Jin
 * @since: 2025-06-12
 * @description: 로그인 폼 컴포넌트 (react-hook-form -> zod -> server action)
 *
 * handleSubmit: 폼 제출 시 동작, onSubmit 함수 호출
 * formState: 폼 상태관리 저장, 잘못된 정보 입력 시 errors 객체에 저장
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { JSX, useActionState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signInAction } from '@/feature/auth/actions/auth.action';
import {
  type SignInFormData,
  signInSchema,
} from '@/feature/auth/schema/auth.schema';
import Logo from '@/shared/components/common/logo';
import Spinner from '@/shared/components/common/spinner';

import { Button } from '../../../shared/components/ui/button';
import AuthLink from './AuthLink';
import SubmitButton from './buttons/SubmitButton';
import ErrorMessage from './ErrorMessage';
import FormField from './FormField';

const SignInForm: () => JSX.Element = () => {
  const [state, formAction] = useActionState(signInAction, null);
  const [_isPending, startTransition] = useTransition();

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

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <>
      {_isPending && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
          <div className='flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-lg'>
            <Spinner size='large' color='primary' />
            <span className='text-primary text-xl font-bold'>처리 중...</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-center h-[67.9rem] w-[34.3rem] flex-col gap-5 px-4 md:h-[76.2rem] md:w-[49.6rem] lg:h-[79.4rem] lg:w-[50rem]'
      >
        <div className='mb-20 flex'>
          <Logo className='' />
        </div>
        <div className='flex w-full flex-col gap-8'>
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
        </div>
        <div className='txt-md-bold mt-20 flex w-full flex-col gap-8'>
          <SubmitButton>로그인</SubmitButton>
          <Button
            size='full'
            className='txt-md-bold bg-[#FFDB00] !text-black hover:bg-[#FFDB00]/60'
          >
            <div className='flex-center gap-[2rem]'>
              <Image
                src='/icons/ui/icon-kakao.svg'
                alt='카카오 아이콘'
                width={24}
                height={24}
                className='h-[2rem] w-[2rem] md:h-[2.4rem] md:w-[2.4rem] lg:h-[2.8rem] lg:w-[2.8rem]'
              />
              카카오로 시작하기
            </div>
          </Button>

          {state?.message && <ErrorMessage message={state.message} />}

          <AuthLink
            label='계정이 없으신가요?'
            linkText='회원가입하기'
            href='/signup'
          />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
