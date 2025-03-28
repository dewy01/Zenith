import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  color: z.string(),
});

export type projectModel = z.infer<typeof projectSchema>;
