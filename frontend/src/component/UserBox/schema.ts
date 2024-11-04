import { z } from 'zod';

export const userSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    oldPassword: z.string().min(8, { message: 'Old password must be at least 8 characters' }).optional().or(z.literal('')),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }).optional().or(z.literal('')),
    passwordConfirm: z.string().optional(),
  })
  .refine((data) => {
    if (data.oldPassword && data.oldPassword !== '') {
      return data.password && data.passwordConfirm;
    }
    return true;
  }, {
    message: 'New password is required',
    path: ['password'],
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export type userModel = z.infer<typeof userSchema>;



export const avatarSchema = z
  .object({
    image: z.union([z.instanceof(File), z.null()]),
  })

export type avatarModel = z.infer<typeof avatarSchema>;
