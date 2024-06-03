import { z } from 'zod';

export const groupSchema = z
  .object({
    groupName: z.string().min(1),
  });

export type groupModel = z.infer<typeof groupSchema>;
