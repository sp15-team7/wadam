/**
 * @author: Hyun
 * @since: 2025-06-10
 * @description: 회원가입 폼 컴포넌트 (react-hook-form -> zod -> server action)
 *
 * register: 각 입력 칸에 연결하여 react-hook-form 추적 및 관리
 * handleSubmit: 폼 제출 시 동작, onSubmit 함수 호출
 * formState: 폼 상태관리 저장, 잘못된 정보 입력 시 errors 객체에 저장
 */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useActionState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signUpAction } from '@/feature/auth/actions/auth.action';
import {
  SignUpFormData,
  SignupSchema,
} from '@/feature/auth/schema/auth.schema';
import Spinner from '@/shared/components/common/spinner';

import AuthLink from './AuthLink';
import SubmitButton from './buttons/SubmitButton';
import ErrorMessage from './ErrorMessage';
import FormField from './FormField';

const SignUpForm: () => JSX.Element = () => {
  const [state, formAction] = useActionState(signUpAction, null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignupSchema),
    mode: 'onBlur',
  });

  // 폼 제출 시 데이터를 FormData로 변환하여 서버 액션으로 전달
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
    <>
      {isPending && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'>
          <div className='flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-lg'>
            <Spinner size='large' color='primary' />
            <span className='text-primary text-xl font-bold'>처리 중...</span>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-center flex h-[67.9rem] w-[34.3rem] flex-col gap-5 px-4 md:h-[76.2rem] md:w-[49.6rem] lg:h-[79.4rem] lg:w-[50rem]'
      >
        <FormField
          label='이메일'
          name='email'
          type='email'
          placeholder='whyne@email.com'
          register={register}
          errors={errors}
        />

        <FormField
          label='닉네임'
          name='nickname'
          type='text'
          placeholder='whyne'
          register={register}
          errors={errors}
        />

        <FormField
          label='비밀번호'
          name='password'
          type='password'
          placeholder='영문, 숫자, 특수문자(!@#$%^&*) 제한'
          register={register}
          errors={errors}
        />

        <FormField
          label='비밀번호 확인'
          name='passwordConfirmation'
          type='password'
          placeholder='비밀번호 확인'
          register={register}
          errors={errors}
        />

        <SubmitButton isPending={isPending}>가입하기</SubmitButton>
        <ErrorMessage message={state?.message} />
        <AuthLink
          label='계정이 이미 있으신가요?'
          linkText='로그인 하러가기'
          href='/signin'
        />
      </form>
    </>
  );
};

export default SignUpForm;
