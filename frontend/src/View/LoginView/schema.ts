import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type loginFormSchema = z.infer<typeof loginFormSchema>;
