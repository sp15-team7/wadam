'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash-es/debounce';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import RatingInput from '@/feature/wines/components/wine-filter/RatingInput';
import WinePriceSlider, {
  MAX_PRICE,
  MIN_PRICE,
} from '@/feature/wines/components/wine-price-slider';
import { WineType, WineTypes } from '@/feature/wines/components/wine-types';

const wineFilterSchema = z.object({
  wineType: z.string(),
  priceRange: z.tuple([z.number(), z.number()]),
  rating: z.number(),
});

export type WineFilterFormValues = z.infer<typeof wineFilterSchema>;

export interface WineFilterFormRef {
  submit: () => void;
  reset: () => void;
}

interface WineFilterFormProps {
  onSubmit: (data: WineFilterFormValues) => void;
}

const WineFilterForm = forwardRef<WineFilterFormRef, WineFilterFormProps>(
  ({ onSubmit }, ref) => {
    const form = useForm<WineFilterFormValues>({
      resolver: zodResolver(wineFilterSchema),
      defaultValues: {
        wineType: 'Red',
        priceRange: [MIN_PRICE, MAX_PRICE],
        rating: 0,
      },
    });

    const debouncedSubmit = useMemo(
      () =>
        debounce((data: WineFilterFormValues) => {
          onSubmit(data);
        }, 500),
      [onSubmit],
    );

    useEffect(() => {
      const subscription = form.watch((value) => {
        debouncedSubmit(value as WineFilterFormValues);
      });

      return () => {
        subscription.unsubscribe();
        debouncedSubmit.cancel();
      };
    }, [debouncedSubmit, form]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        debouncedSubmit.cancel();
        form.handleSubmit(onSubmit)();
      },
      reset: () => {
        form.reset({
          wineType: 'Red',
          priceRange: [MIN_PRICE, MAX_PRICE],
          rating: 0,
        });
      },
    }));

    return (
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex h-full w-full flex-col'
      >
        <div className='flex-1'>
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
              <div className='flex-center flex-col px-4'>
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
