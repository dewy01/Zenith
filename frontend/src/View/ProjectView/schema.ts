import { z } from 'zod';
import { ProjectStatus } from '~/api/Projects/api';

export const projectSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    deadline: z.date(),
    status: z.nativeEnum(ProjectStatus),
  });

export type projectModel = z.infer<typeof projectSchema>;
