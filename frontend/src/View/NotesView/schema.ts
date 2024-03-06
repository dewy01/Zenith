import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
});

export type noteModel = z.infer<typeof noteSchema>;
