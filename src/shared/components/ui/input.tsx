import { cn } from '@/shared/libs/utils/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border-secondary text-md-small focus-visible:border-ring focus-visible:ring-primary aria-invalid:border-primary aria-invalid:ring-primary flex h-[5.2rem] w-full min-w-0 rounded-full border px-6 py-[1.4rem] transition-all outline-none focus-visible:ring-[0.3rem]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
