import { RadioInput } from '@/shared/components/common/radio-input';
import StarRating from '@/shared/components/common/star-rating';
import { RadioGroup } from '@/shared/components/ui/radio-group';

const RatingInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const handleValueChange = (v: string) => onChange(Number(v));

  return (
    <RadioGroup
      value={value.toString()}
      onValueChange={handleValueChange}
      className='flex flex-col space-y-3'
    >
      <RadioInput label='전체' value={0} />
      <RadioInput
        label={<StarRating readOnly size='md' value={5} />}
        value={5}
      />
      <RadioInput
        label={<StarRating readOnly size='md' value={4} />}
        value={4}
      />
      <RadioInput
        label={<StarRating readOnly size='md' value={3} />}
        value={3}
      />
      <RadioInput
        label={<StarRating readOnly size='md' value={2} />}
        value={2}
      />
      <RadioInput
        label={<StarRating readOnly size='md' value={1} />}
        value={1}
      />
    </RadioGroup>
  );
};

export default RatingInput;
