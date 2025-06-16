/**
 * @author Sarang
 * @since 2025-06-15
 * @description 라디오 인풋 컴포넌트
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
      onValueChange,
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
          'p-[1.2rem]',
          'rounded-lg',
          'hover:bg-primary cursor-pointer transition-colors duration-200', // 호버 효과
          containerClassName,
        )}
        onClick={() => {
          if (value && onValueChange) {
            onValueChange(value);
          }
        }}
        // 키보드 접근성 추가
        onKeyDown={(event) => {
          if (
            event.key === 'Enter' ||
            event.key === ' ' ||
            event.key === 'Spacebar'
          ) {
            event.preventDefault(); // 기본 스크롤 동작 방지
            if (value && onValueChange) {
              onValueChange(value);
            }
          }
        }}
        tabIndex={0} // 키보드 포커스 가능하게
      >
        <RadioGroupItem
          ref={ref}
          id={uniqueId}
          value={value}
          className={cn(
            'h-[2rem] w-[2rem]', // 체크박스 크기 20*20
            'rounded-[6px]',
            'border-[1px] border-[var(--color-gray)]',
            'bg-[var(--color-secondary)]', // 체크박스 배경색
            'data-[state=checked]:border-[var(--color-secondary)]', // 선택 시 테두리 색상 변경
            'text-secondary', // 체크박스 내부 체크 점 색상
            'focus:ring-offset-background focus:ring-ring focus:ring-2 focus:ring-offset-2', // 포커스 스타일 유지
            radioClassName,
            className,
          )}
          {...props}
        >
          {/* RadioGroupItem의 내부 체크 마크는 CSS로 제어합니다. */}
        </RadioGroupItem>
        <label
          htmlFor={uniqueId}
          id={`label-${uniqueId}`} // aria-labelledby와 연결되도록 id 연결
          className={cn(
            'txt-lg-regular',
            'txt-black', // 텍스트 색상
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
