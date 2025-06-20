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
 * <RadioInput value={2} label="옵션 2" />
 * </RadioGroup>
 *
 * @template TValue
 * @param {TValue} value - 라디오버튼 식별값 (필수)
 * @param {React.ReactNode} label - 라디오 버튼 옆에 표시될 텍스트 라벨
 * @param {string} [containerClassName] - 컨테이너 CSS 클래스
 * @param {string} [radioClassName] - RadioGroupItem CSS 클래스
 * @param {string} [labelClassName] - 레이블 텍스트 CSS 클래스
 * @param {React.ReactNode} [children] - 레이블 외 컨테이너 안에 들어갈 추가 콘텐츠
 * @param {string} [className] - RadioGroupItem 컴포넌트 자체에 적용되는 Tailwind CSS 클래스
 */

import * as React from 'react';

import { RadioGroupItem } from '@/shared/components/ui/radio-group';
import { cn } from '@/shared/libs/utils/cn';

interface RadioInputProps<TValue extends string | number>
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupItem>, 'value'> {
  label: React.ReactNode;
  value: TValue;
  containerClassName?: string;
  radioClassName?: string;
  labelClassName?: string;
}

const RadioInput = React.forwardRef(
  <TValue extends string | number>(
    {
      className,
      label,
      children,
      containerClassName,
      radioClassName,
      labelClassName,
      value,
      ...props
    }: RadioInputProps<TValue>,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const uniqueId = React.useId();

    return (
      <label
        htmlFor={uniqueId}
        className={cn(
          'flex items-center', // 레이아웃
          'gap-[2rem]', // 체크박스와 텍스트 사이 간격
          'cursor-pointer',
          'rounded', // 호버 효과
          containerClassName,
        )}
      >
        <RadioGroupItem
          ref={ref}
          id={uniqueId}
          value={String(value)}
          className={cn(
            'size-[1.4rem] md:size-[1.8rem]',
            'rounded-md', // radio button rounded
            'bg-secondary', // 체크박스 배경색
            'overflow-hidden',
            'relative', // ::after 가상 요소를 위해 relative 설정

            // === 내부 체크박스 css ===
            'data-[state=checked]:after:content-[""]', // 체크 시 ::after 가상 요소 활성화
            'data-[state=checked]:after:block',
            'data-[state=checked]:after:size-3 md:data-[state=checked]:after:size-4',
            'data-[state=checked]:after:rounded-sm',
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
        />
        <div
          id={`label-${uniqueId}`} // aria-labelledby와 연결되도록 id 연결
          className={cn(
            'text-[1.4rem] font-semibold md:text-[1.6rem]',
            'txt-black', // 텍스트 색상
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70', // disabled 스타일 유지
            labelClassName,
          )}
        >
          {label}
        </div>
        {children}
      </label>
    );
  },
);

RadioInput.displayName = 'RadioInput';

const GenericRadioInput = RadioInput as <TValue extends string | number>(
  props: RadioInputProps<TValue> & {
    ref?: React.ForwardedRef<HTMLButtonElement>;
  },
) => React.ReactElement;

export { GenericRadioInput as RadioInput };
