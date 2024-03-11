import { z } from 'zod';

export const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export type todoModel = z.infer<typeof todoSchema>;
