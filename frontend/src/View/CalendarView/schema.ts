import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  dateTime: z.string(),
  eventColor: z.string().min(1),
});

export type eventModel = z.infer<typeof eventSchema>;
