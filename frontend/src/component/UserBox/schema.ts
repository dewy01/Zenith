import { z } from 'zod';

export const userSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().min(1).email(),
    oldPassword: z.string().min(8).optional().or(z.literal('')),
    password: z.string().min(8).optional().or(z.literal('')),
    passwordConfirm: z.string().optional(),
  }).refine((item) => item.password === item.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });;

export type userModel = z.infer<typeof userSchema>;
