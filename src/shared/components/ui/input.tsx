import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/libs/utils/cn';

// Input Variants 정의
const inputVariants = cva(
  'border-secondary focus-visible:border-ring focus-visible:ring-primary aria-invalid:border-primary aria-invalid:ring-primary placeholder:text-gray flex w-full min-w-0 rounded-full border txt-black transition-all outline-none focus-visible:ring-[0.1rem] bg-white',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-primary ring-primary',
        disabled: 'bg-secondary/40 !text-gray cursor-not-allowed opacity-60',
      },
      size: {
        md: 'h-[4.8rem] py-[1.1rem] text-[1.6rem] leading-[2.6rem] w-[40rem]',
        sm: 'h-[3.8rem] py-[0.7rem] text-[1.4rem] leading-[2.4rem] w-[21rem]',
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
