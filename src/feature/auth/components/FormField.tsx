/**
 * @author Hyun, Zin
 * @since 2025-06-10
 * @description: 반복되는 Form 내부 구조 분리 (style, label, input, error message)
 */

import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

// auth - signup 공통 스타일
// const LABEL_STYLE = 'text-md-bold md:text-lg-bold lg:text-2lg-bold';
// const INPUT_STYLE =
//   'text-lg-small mt-1 h-[42px] w-[303px] rounded-full border px-5 md:h-[52px] md:w-[400px] lg:w-[500px]';
const ERROR_STYLE = 'text-xl font-medium text-primary mr-2';

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  onFocus?: () => void;
}

const FormField = <T extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
  onFocus,
}: FormFieldProps<T>) => {
  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <Label htmlFor={name} className='text-xl font-medium'>
          {label}
        </Label>
        {errors[name] && (
          <p className={ERROR_STYLE}>{String(errors[name]?.message)}</p>
        )}
      </div>
      <Input
        id={name}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full text-2xl font-normal`}
        onFocus={onFocus}
      />
    </div>
  );
};

export default FormField;
