import { z } from 'zod';

export const registerFormSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type registerFormSchema = z.infer<typeof registerFormSchema>;
