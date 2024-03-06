import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(1),
});

export type forgotPasswordModel = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    resetToken: z.string().min(16).max(16),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine((item) => item.password === item.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type resetPasswordModel = z.infer<typeof resetPasswordSchema>;
