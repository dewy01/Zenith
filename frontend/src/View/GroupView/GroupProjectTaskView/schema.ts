import { z } from 'zod';

export const taskSchema = z
  .object({
    projectID: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    userId: z.number(),
    category: z.enum(['Note' , 'Email'  , 'Meeting'  , 'Research' , 'Design' , 'Development'  , 'Maintenance']),
    status: z.enum(['Backlog','in Progress','For Review']),
  });

export type taskModel = z.infer<typeof taskSchema>;
