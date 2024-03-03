import { z } from 'zod';

export const registerFormSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
  passwordConfirm: z.string().min(1),
}).refine((item) => item.password === item.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export type registerFormSchema = z.infer<typeof registerFormSchema>;
