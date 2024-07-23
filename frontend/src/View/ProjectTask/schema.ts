import { z } from 'zod';
import { ProjectTaskStatus } from '~/api/Projects/api';

export const taskSchema = z
  .object({
    projectID: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(['Note' , 'Email'  , 'Meeting'  , 'Research' , 'Design' , 'Development'  , 'Maintenance']),
    status: z.nativeEnum(ProjectTaskStatus),
  });

export type taskModel = z.infer<typeof taskSchema>;
