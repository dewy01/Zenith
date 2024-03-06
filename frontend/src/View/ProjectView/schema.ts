import { z } from 'zod';

export const projectSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    deadline: z.date(),
    status: z.enum(['on Hold','in Progress','Done']),
  });

export type projectModel = z.infer<typeof projectSchema>;
