import { Box, Typography, alpha } from '@mui/material';
import { LoadingView } from '../LoadingView/LoadingView';
import { getProjectTodoById } from '~/api/ProjectTodos/query';
import { DialogCreate } from './TodoTask/DialogCreate';
import { TodoCard } from '~/component/TodoCard';

type Props = {
  projectId: number;
};

export const TodoPreview = ({ projectId }: Props) => {
  const { data: project, isLoading } = getProjectTodoById(projectId);

  if (isLoading || project === undefined) {
    return <LoadingView />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography
        color={alpha(project.color, 0.9)}
        fontWeight={'medium'}
        variant="h4"
        textAlign={'center'}
      >
        {project.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
          gap: 2,
        }}
      >
        {project.todos.map((todo) => (
          <TodoCard key={todo.todoID} todo={todo} color={project.color} />
        ))}
        <DialogCreate color={project.color} projectId={projectId} />
      </Box>
    </Box>
  );
};
