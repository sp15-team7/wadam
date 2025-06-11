import { cn } from '@/shared/libs/utils/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border-secondary txt-lg-small focus-visible:border-ring focus-visible:ring-primary aria-invalid:border-primary aria-invalid:ring-primary placeholder:txt-gray flex h-[5rem] w-full min-w-0 rounded-full border px-6 py-[1.4rem] text-black transition-all outline-none focus-visible:ring-[0.2rem]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
