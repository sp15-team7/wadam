'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash-es/debounce';
import { Search } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import RatingInput from '@/feature/wines/components/wine-filter/RatingInput';
import WinePriceSlider, {
  MAX_PRICE,
  MIN_PRICE,
} from '@/feature/wines/components/wine-price-slider';
import { WineType, WineTypes } from '@/feature/wines/components/wine-types';
import { Input } from '@/shared/components/ui/input';

const wineFilterSchema = z.object({
  name: z.string(),
  wineType: z.string(),
  priceRange: z.tuple([z.number(), z.number()]),
  rating: z.number(),
});

export type WineFilterFormValues = z.infer<typeof wineFilterSchema>;

export const DEFAULT_WINE_FILTER_VALUES: WineFilterFormValues = {
  name: '',
  wineType: 'Red',
  priceRange: [MIN_PRICE, MAX_PRICE],
  rating: 0,
};

export interface WineFilterFormRef {
  submit: () => void;
  reset: () => void;
}

interface WineFilterFormProps {
  onSubmit: (data: WineFilterFormValues) => void;
  initialValues?: WineFilterFormValues;
  submitOnChange?: boolean;
}

const WineFilterForm = forwardRef<WineFilterFormRef, WineFilterFormProps>(
  (
    {
      onSubmit,
      initialValues = DEFAULT_WINE_FILTER_VALUES,
      submitOnChange = false,
    },
    ref,
  ) => {
    const form = useForm<WineFilterFormValues>({
      resolver: zodResolver(wineFilterSchema),
      defaultValues: initialValues,
    });

    const debouncedSubmit300 = useMemo(
      () => debounce(onSubmit, 300),
      [onSubmit],
    );
    const debouncedSubmit100 = useMemo(
      () => debounce(onSubmit, 100),
      [onSubmit],
    );

    useEffect(() => {
      if (!submitOnChange) return;

      const subscription = form.watch((value, { name }) => {
        debouncedSubmit100.cancel();
        debouncedSubmit300.cancel();

        const newValues = value as WineFilterFormValues;

        if (name === 'name' || name === 'priceRange') {
          debouncedSubmit300(newValues);
        } else {
          debouncedSubmit100(newValues);
        }
      });

      return () => {
        subscription.unsubscribe();
        debouncedSubmit100.cancel();
        debouncedSubmit300.cancel();
      };
    }, [
      form,
      onSubmit,
      submitOnChange,
      debouncedSubmit100,
      debouncedSubmit300,
    ]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)();
      },
      reset: () => {
        form.reset(DEFAULT_WINE_FILTER_VALUES);
      },
    }));

    return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex h-full w-full flex-col gap-12'
      >
        <Controller
          control={form.control}
          name='name'
          render={({ field }) => (
            <Input
              {...field}
              icon={<Search color='#b2ae98' className='size-[2.2rem]' />}
              placeholder='와인 검색'
              className='border-secondary placeholder:text-gray w-full text-[1.6rem]'
            />
          )}
        />
        <div className='flex flex-1'>
          <div className='flex w-full flex-col gap-25'>
            <div>
              <h3 className='mb-6 text-[2rem] font-semibold'>WINE TYPES</h3>
              <Controller
                control={form.control}
                name='wineType'
                render={({ field }) => (
                  <WineTypes
                    value={field.value as WineType}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className=''>
              <h3 className='mb-10 text-[2rem] font-semibold'>WINE PRICE</h3>
              <div className='flex-center flex-col px-4 lg:px-0'>
                <Controller
                  control={form.control}
                  name='priceRange'
                  render={({ field }) => (
                    <WinePriceSlider
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='pb-10'>
              <h3 className='mb-6 text-[2rem] font-semibold'>RATING</h3>
              <Controller
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <RatingInput value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    );
  },
);

WineFilterForm.displayName = 'WineFilterForm';

export default WineFilterForm;
