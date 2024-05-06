import { z } from 'zod';

export const groupProjectSchema = z
  .object({
    title: z.string().min(1),
    groupID: z.number().optional(),
    description: z.string().optional(),
    deadline: z.date(),
    status: z.enum(['on Hold','in Progress','Done']),
  });

export type groupProjectModel = z.infer<typeof groupProjectSchema>;
