import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import FormField from '@/feature/auth/components/FormField';
import {
  CreateWineRequest,
  createWineRequestSchema,
  WineTypeEnumSchema,
} from '@/feature/wines/schema/wine.schema';

const WineCreateForm = () => {
  const form = useForm<CreateWineRequest>({
    resolver: zodResolver(createWineRequestSchema),
    defaultValues: {
      name: '',
      region: '',
      image: '',
      price: 0,
      type: WineTypeEnumSchema.options[0],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: CreateWineRequest) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <FormField
        label='와인 이름'
        name='name'
        register={register}
        errors={errors}
      />
      <FormField
        label='가격'
        name='price'
        register={register}
        errors={errors}
      />
      <FormField
        label='와인 원산지'
        name='region'
        register={register}
        errors={errors}
      />
      <FormField
        label='와인 종류'
        name='type'
        register={register}
        errors={errors}
      />
    </form>
  );
};
export default WineCreateForm;
