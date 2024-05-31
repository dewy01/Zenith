import { Box, Typography } from '@mui/material';
import { DrawerLink } from '../NotesView/DrawerLink';
import { DialogEdit } from './DialogEdit';
import { ProjectTodo } from '~/api/ProjectTodos/api';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  project: ProjectTodo;
  selectedProject: ProjectTodo | undefined;
  setSelectedProject: Dispatch<SetStateAction<ProjectTodo | undefined>>;
};

export const TodoLink = ({
  project,
  selectedProject,
  setSelectedProject,
}: Props) => {
  return (
    <Box
      key={project.projectTodoID}
      onClick={() => setSelectedProject(project)}
      display={'flex'}
      flexDirection={'column'}
      sx={{
        cursor: 'pointer',
      }}
    >
      <DrawerLink
        key={project.projectTodoID}
        isActive={project.projectTodoID === selectedProject?.projectTodoID}
        color={project.color}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box flexGrow={1}>
            <Typography
              sx={(theme) => ({
                textWrap: 'wrap',
                wordBreak: 'break-word',
                textDecoration: project.isDone ? 'line-through' : '',
                color: project.isDone ? theme.palette.text.secondary : '',
              })}
            >
              {project.title}
            </Typography>
            <Typography
              variant="caption"
              sx={(theme) => ({
                textWrap: 'wrap',
                wordBreak: 'break-word',
                color: theme.palette.text.secondary,
                textDecoration: project.isDone ? 'line-through' : '',
              })}
            >
              {project.description}
            </Typography>
          </Box>
          {project.projectTodoID === selectedProject?.projectTodoID && (
            <DialogEdit project={selectedProject} />
          )}
        </Box>
      </DrawerLink>
    </Box>
  );
};
