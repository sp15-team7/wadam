/**
 * @author Sarang
 * @since 2025-06-15
 * @description 재사용 가능한 텍스트 입력 필드 컴포넌트
 *
 * @example
 * // 기본 입력 필드
 * <Input placeholder="이름을 입력해 주세요" />
 *
 * @example
 * // 에러 상태 및 작은 크기
 * <Input variant="error" size="sm" placeholder="잘못된 입력입니다." />
 *
 * @example
 * // 아이콘 포함
 * <Input icon={<SearchIcon />} placeholder="검색어를 입력하세요" />
 *
 * @param {string} [placeholder] - 입력값이 없을 때 드러나는 텍스트.
 * @param {'default' | 'error' | 'disabled'} [variant] - 인풋 시각적 상태 (기본, 에러, 비활성화).
 * @param {'md' | 'sm'} [size] - 인풋 크기 ('md' | 'sm')
 * @param {React.ReactNode} [icon] - 인풋 왼쪽에 표시될 아이콘 컴포넌트, 20px x 20px 크기
 * @param {boolean} [disabled] - 인풋을 비활성화할지 여부
 * @param {boolean} [readOnly] - 인풋을 읽기 전용으로 설정할지 여부
 */

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/libs/utils/cn';

// Input Variants 정의
const inputVariants = cva(
  'border-secondary focus-visible:border-ring focus-visible:ring-primary aria-invalid:border-primary aria-invalid:ring-primary placeholder:text-gray txt-black flex w-full min-w-0 rounded-full border bg-white transition-all outline-none focus-visible:ring-[0.1rem]',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-primary ring-primary',
        disabled: 'bg-secondary/40 !text-gray cursor-not-allowed opacity-60',
      },
      size: {
        md: 'h-[4.8rem] w-[40rem] py-[1.1rem] text-[1.6rem] leading-[2.6rem]',
        sm: 'h-[3.8rem] w-[21rem] py-[0.7rem] text-[1.4rem] leading-[2.4rem]',
      },
      hasIcon: {
        true: '',
        false: 'pl-[2.0rem]',
      },
    },
    compoundVariants: [
      {
        size: 'md',
        hasIcon: true,
        className: 'pl-[5.4rem]',
      },
      {
        size: 'sm',
        hasIcon: true,
        className: 'pl-[5.4rem]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hasIcon: false,
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  variant?: VariantProps<typeof inputVariants>['variant'];
  size?: VariantProps<typeof inputVariants>['size'];
  icon?: React.ReactNode; // 아이콘 컴포넌트
  readOnly?: boolean;
}

function Input({
  className,
  type,
  placeholder,
  variant,
  size,
  icon, // true or false
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const hasIcon = Boolean(icon);
  const appliedVariant = disabled ? 'disabled' : variant;

  return (
    <div className='relative flex w-full items-center'>
      {icon && (
        <div className='text-gray pointer-events-none absolute left-[2rem] z-10 flex h-[2rem] w-[2rem] items-center justify-center'>
          {icon}
        </div>
      )}
      <input
        type={type}
        data-slot='input'
        className={cn(
          inputVariants({
            variant: appliedVariant,
            size,
            hasIcon,
          }),
          className,
        )}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export { Input };
