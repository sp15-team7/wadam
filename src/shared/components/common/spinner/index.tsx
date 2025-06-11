import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/libs/utils/cn';

const spinnerVariants = cva(
  'inline-block animate-[spin_0.6s_linear_infinite] rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
  {
    variants: {
      size: {
        small: 'h-[1.6rem] w-[1.6rem]', // 16px
        large: 'h-[2.4rem] w-[2.4rem]', // 32px
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
      },
    },
    defaultVariants: {
      size: 'small',
      color: 'primary',
    },
  },
);

type SpinnerProps = {
  className?: string;
} & VariantProps<typeof spinnerVariants>;

const Spinner = ({ size, className, color }: SpinnerProps) => {
  return (
    <div
      className={cn(spinnerVariants({ size, color }), className)}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]'>
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
