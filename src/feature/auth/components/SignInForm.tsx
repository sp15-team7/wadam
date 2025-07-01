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
import { JSX, useActionState, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signInAction } from '@/feature/auth/actions/auth.action';
import ErrorMessage from '@/feature/auth/components/ErrorMessage';
import {
  type SignInFormData,
  signInSchema,
} from '@/feature/auth/schema/auth.schema';
import Logo from '@/shared/components/common/logo';
import Spinner from '@/shared/components/common/spinner';

import AuthLink from './AuthLink';
import SubmitButton from './buttons/SubmitButton';
import FormField from './FormField';

const SignInForm: () => JSX.Element = () => {
  const [state, formAction] = useActionState(signInAction, null);
  const [_isPending, startTransition] = useTransition();
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  // state가 변경될 때마다 에러 메시지 표시 상태 업데이트
  useEffect(() => {
    if (state?.message) {
      setShowError(true);
    }
  }, [state]);

  const onSubmit = async (data: SignInFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // 로그인 시도 시 에러 상태 초기화
    setShowError(false);

    startTransition(() => {
      formAction(formData);
    });
  };

  // input에 focus가 되면 에러 메시지 숨기기
  const handleInputFocus = () => {
    setShowError(false);
  };

  return (
    <>
      {_isPending && (
        <div className='flex-center fixed inset-0 z-50 bg-black/70'>
          <div className='flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-lg'>
            <Spinner size='large' color='primary' />
            <span className='text-primary text-xl font-bold'>처리 중...</span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-center h-[67.9rem] w-[34.3rem] flex-col items-center gap-20 md:h-[76.2rem] md:w-[49.6rem] lg:h-[79.4rem] lg:w-[50rem]'
      >
        <div className='mb-10'>
          <Logo />
        </div>

        <div className='flex-center w-full flex-col gap-4'>
          <FormField<SignInFormData>
            label='이메일'
            name='email'
            type='email'
            placeholder='이메일 입력'
            register={register}
            errors={errors}
            onFocus={handleInputFocus}
          />

          <FormField<SignInFormData>
            label='비밀번호'
            name='password'
            type='password'
            placeholder='비밀번호 입력'
            register={register}
            errors={errors}
            onFocus={handleInputFocus}
          />
          <div className='mt-2 h-4 w-full'>
            {state?.message && showError && (
              <ErrorMessage message={state.message} />
            )}
          </div>
        </div>
        <div className='flex w-full flex-col gap-8'>
          <SubmitButton>로그인</SubmitButton>
          {/* <Button
            size='full'
            className='mt-[-1rem] bg-[#FFDB00] !text-black hover:bg-[#FFDB00]/60'
          >
            <div className='flex-center gap-x-3'>
              <Image
                src='/icons/ui/icon-kakao.svg'
                alt='카카오 아이콘'
                width={24}
                height={24}
                className='h-8 w-8'
              />
              카카오로 시작하기
            </div>
          </Button> */}

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
