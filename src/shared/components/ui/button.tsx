import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/libs/utils/cn';

const buttonVariants = cva(
  'flex-center py-[1.4rem]has-[>svg]:px-3 h-[5rem] cursor-pointer rounded-full text-2xl font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary/80 !text-white transition-all',
        secondary:
          'bg-secondary !text-primary hover:bg-secondary/60 transition-all',
        disabled: 'bg-secondary cursor-not-allowed !text-white opacity-40',
      },
      size: {
        xs: 'px-[4.8rem]',
        sm: 'px-[7.8rem]',
        md: 'px-[11rem]',
        lg: 'px-[18rem]',
        xl: 'px-[20rem]',
        full: 'w-full',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
);

/**
 * @description 커스텀 버튼 컴포넌트
 * @param className - className
 * @param variant - variant (primary, secondary, disabled)
 * @param size - size (xs, sm, md, lg, xl, full, icon)
 * @param asChild - asChild (boolean)
 * @param props - props (React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean })
 * @returns 커스텀 버튼 컴포넌트
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
