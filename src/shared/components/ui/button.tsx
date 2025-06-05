import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/libs/utils/cn';

// destructive, outline, ghost, link 고려
const buttonVariants = cva(
  'items-justify-center rounded-full cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary !text-white hover:bg-primary/90 transition-all',
        secondary: 'bg-secondary !text-primary hover:bg-secondary/80',
        disabled: 'bg-gray-200 !text-gray-400',
        link: '!text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-[4.8rem] px-[17.2rem] py-[1.6rem] text-lg-bold has-[>svg]:px-3',
        lg: 'h-[4.8rem] px-[20rem] py-[1.6rem] text-lg-bold has-[>svg]:px-3',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
);

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
