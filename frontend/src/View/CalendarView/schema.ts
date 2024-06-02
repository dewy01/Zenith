import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  dateTime: z.string(),
  eventColor: z.string().min(1),
});

export type eventModel = z.infer<typeof eventSchema>;


export const colorSchema = z.object({
  colors: z.object({
    Purple: z.boolean(),
    Red: z.boolean(),
    Green: z.boolean(),
    Blue: z.boolean(),
    Yellow: z.boolean(),
  }),
});

export type ColorModel = z.infer<typeof colorSchema>;
