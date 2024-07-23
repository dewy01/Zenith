import { z } from 'zod';
import { ProjectStatus } from '~/api/Projects/api';

export const groupProjectSchema = z
  .object({
    title: z.string().min(1),
    groupID: z.number().optional(),
    description: z.string().optional(),
    deadline: z.date(),
    status: z.nativeEnum(ProjectStatus),
  });

export type groupProjectModel = z.infer<typeof groupProjectSchema>;
