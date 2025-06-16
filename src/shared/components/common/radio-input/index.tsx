/**
 * @author Sarang
 * @since 2025-06-15
 * @description 라디오 인풋 컴포넌트
 * RadioGroupItem을 기반으로 라디오 버튼과 레이블을 표시
 *
 * @example
 * // 기본 사용법
 * <RadioGroup defaultValue="option1">
 * <RadioInput value="option1" label="옵션 1" />
 * </RadioGroup>
 *
 * @param {string} value - 라디오버튼 식별값 (필수)
 * @param {React.ReactNode} label - 라디오 버튼 옆에 표시될 텍스트 라벨
 * @param {string} [containerClassName] - 컨테이너 CSS 클래스
 * @param {string} [radioClassName] - RadioGroupItem CSS 클래스
 * @param {string} [labelClassName] - 레이블 텍스트 CSS 클래스
 * @param {React.ReactNode} [children] - 레이블 외 컨테이너 안에 들어갈 추가 콘텐츠
 * @param {string} [className] - RadioGroupItem 컴포넌트 자체에 적용되는 Tailwind CSS 클래스
 * @param {(value: string) => void} [onValueChange] - 값이 변경될 때 호출되는 콜백 함수
 */

import * as React from 'react';

import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { cn } from '@/shared/libs/utils/cn';

interface RadioInputProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label: React.ReactNode; // 숫자 범위 표시
  containerClassName?: string; // 전체 컨테이너에 적용할 추가 클래스
  radioClassName?: string; // RadioGroupItem (체크 표시)에 적용할 추가 클래스
  labelClassName?: string; // label에 적용할 추가 클래스
  onValueChange?: (value: string) => void;
}

const RadioInput = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioInputProps
>(
  (
    {
      className,
      label,
      children,
      containerClassName,
      radioClassName,
      labelClassName,
      value, // RadioGroupItem의 value를 받음
      ...props
    },
    ref,
  ) => {
    const uniqueId = React.useId(); // 고유 ID 생성 (접근성 향상)

    return (
      <div
        className={cn(
          'flex items-center', // 레이아웃
          'gap-[1.5rem]', // 체크박스와 텍스트 사이 간격
          'p-[1.2rem]', // 내부 패딩
          'rounded-lg',
          'cursor-pointer duration-200', // 호버 효과
          containerClassName,
        )}
      >
        <RadioGroupItem
          ref={ref}
          id={uniqueId}
          value={value}
          className={cn(
            'h-[2rem] w-[2rem]', // 체크박스 크기 20*20
            'border-[1px] border-[var(--color-white)]',
            'bg-[var(--color-white)]', // 체크박스 배경색
            'overflow-hidden',
            'relative', // ::after 가상 요소를 위해 relative 설정
            // 체크되었을 때의 스타일
            'data-[state=checked]:border-[--color-secondary-light]', // 선택 시 테두리 색상
            'data-[state=checked]:bg-[var(--color-white)]', // 선택 시 내부 채움 색상을 흰색으로 유지
            'data-[state=checked]:text-transparent',

            // === 내부 체크박스 css ===
            'data-[state=checked]:after:content-[""]', // 체크 시 ::after 가상 요소 활성화
            'data-[state=checked]:after:block',
            'data-[state=checked]:after:w-[1rem]',
            'data-[state=checked]:after:h-[1rem]',
            'data-[state=checked]:after:rounded',
            'data-[state=checked]:after:bg-primary',
            'data-[state=checked]:after:absolute',
            'data-[state=checked]:after:top-1/2',
            'data-[state=checked]:after:left-1/2',
            'data-[state=checked]:after:-translate-x-1/2',
            'data-[state=checked]:after:-translate-y-1/2',
            // ===============================================

            'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            'cursor-pointer',
            radioClassName,
            className,
          )}
          {...props}
        ></RadioGroupItem>
        <label
          htmlFor={uniqueId}
          id={`label-${uniqueId}`} // aria-labelledby와 연결되도록 id 연결
          className={cn(
            'txt-lg-bold',
            'txt-black', // 텍스트 색상
            'cursor-pointer',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70', // disabled 스타일 유지
            labelClassName,
          )}
        >
          {label}
        </label>
        {children}
      </div>
    );
  },
);
RadioInput.displayName = RadioInput.name;

export { RadioInput };
