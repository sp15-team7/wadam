import { z } from 'zod';

const MAX_PRICE = 500000;
const MIN_PRICE = 0;

export const wineFilterSchema = z.object({
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
