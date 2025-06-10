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

import { JSX, useActionState } from 'react';

import { signUpAction } from '@/feature/auth/actions/auth.action';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignupSchema,
  SignUpFormData,
} from '@/feature/auth/schema/auth.schema';
import SubmitButton from './buttons/SubmitButton';

import FormField from './FormField';
import AuthLink from './AuthLink';
import ErrorMessage from './ErrorMessage';

const SignUpForm: () => JSX.Element = () => {
  const [state, formAction] = useActionState(signUpAction, null);

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
    formAction(formData);
  };

  return (
    <div className='flex min-h-screen items-start justify-center pt-8 md:items-center md:pt-0'>
      <div className='w-full max-w-[400px] space-y-8 rounded-lg bg-white p-8 md:max-w-[500px] md:p-12 lg:max-w-[600px] lg:p-16'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-5 px-4'
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

          <SubmitButton>가입하기</SubmitButton>
          <ErrorMessage message={state?.message} />
        </form>
        <AuthLink
          label='계정이 이미 있으신가요?'
          linkText='로그인 하러가기'
          href='/signin'
        />
      </div>
    </div>
  );
};

export default SignUpForm;
