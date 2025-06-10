/**
 * @author Hyun
 * @since 2025-06-10
 * @description: 반복되는 Form 내부 구조 분리 (style, label, input, error message)
 */

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';

// auth - signup 공통 스타일
const LABEL_STYLE = 'text-md-bold md:text-lg-bold lg:text-2lg-bold';
const INPUT_STYLE =
  'text-lg-small mt-1 h-[42px] w-[303px] rounded-full border px-5 md:h-[52px] md:w-[400px] lg:w-[500px]';
const ERROR_STYLE =
  'text-sm-small text-primary md:text-md-small lg:text-md-small pt-2';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  errors: any;
}

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
}: FormFieldProps) => {
  return (
    <div>
      <Label htmlFor={name} className={LABEL_STYLE}>
        {label}
      </Label>
      <Input
        id={name}
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={INPUT_STYLE}
      />
      {errors[name] && <p className={ERROR_STYLE}>{errors[name].message}</p>}
    </div>
  );
};

export default FormField;
