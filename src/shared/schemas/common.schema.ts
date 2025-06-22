import { z } from 'zod';

export const urlSchema = z.string().regex(/^https?:\/\/.+/, {
  message: 'Invalid URL format, must start with http:// or https://',
});
export type Url = z.infer<typeof urlSchema>;

export const nonNegativeNumberSchema = z.number().nonnegative();
export type NonNegativeNumber = z.infer<typeof nonNegativeNumberSchema>;

export const positiveNumberSchema = z.number().positive();
export type PositiveNumber = z.infer<typeof positiveNumberSchema>;

export const nonEmptyStringSchema = z.string().min(1, '후기를 작성해주세요.');
export type NonEmptyString = z.infer<typeof nonEmptyStringSchema>;
