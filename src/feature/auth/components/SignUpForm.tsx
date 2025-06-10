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

import { Input } from '@/shared/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignupSchema,
  SignUpFormData,
} from '@/feature/auth/schema/auth.schema';
import SubmitButton from './buttons/SubmitButton';

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
          <div>
            <label className='text-md-bold md:text-lg-bold lg:text-2lg-bold'>
              이메일
            </label>
            <Input
              {...register('email')}
              type='email'
              placeholder='whyne@email.com'
              className='text-lg-small mt-1 h-[42px] w-[303px] rounded-full border px-5 md:h-[52px] md:w-[400px] lg:w-[500px]'
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
              className='text-lg-small mt-1 h-[42px] w-[303px] rounded-full border px-5 md:h-[52px] md:w-[400px] lg:w-[500px]'
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
              className='text-lg-small mt-1 h-[42px] w-[303px] rounded-full border px-5 md:h-[52px] md:w-[400px] lg:w-[500px]'
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
              className='text-lg-small mt-1 h-[42px] w-[303px] rounded-full border px-5 md:h-[52px] md:w-[400px] lg:w-[500px]'
            />
            {errors.passwordConfirmation && (
              <p className='text-sm-small text-primary md:text-md-small lg:text-md-small pt-2'>
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>
          <SubmitButton>가입하기</SubmitButton>
          {state?.message && (
            <p className='text-destructive text-sm font-medium'>
              {state.message}
            </p>
          )}
        </form>
        <div className='mt-2 flex flex-row items-center justify-center gap-x-4'>
          <span className='text-secondary text-md-small'>
            계정이 이미 있으신가요?
          </span>
          <Link
            href='/signin'
            className='text-primary text-md-regular underline'
          >
            로그인 하러가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
