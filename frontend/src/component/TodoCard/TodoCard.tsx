import { Box, Checkbox, IconButton, Typography, alpha } from '@mui/material';
import { Todo } from '~/api/ProjectTodos/api';
import { deleteTodo, mutateToggleTodo } from '~/api/Todos/query';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .appear-item': {
      height: 0,
      overflow: 'hidden',
      transition: 'opacity 0.3s ease-out',
      opacity: 0,
    },
    '&:hover .appear-item': {
      height: 'auto',
      opacity: 1,
    },
  },
}));

type Props = {
  todo: Todo;
  color: string;
};

export const TodoCard = ({ todo, color }: Props) => {
  const { mutateAsync } = mutateToggleTodo();
  const { mutateAsync: removeTodo } = deleteTodo();
  const classes = useStyles();

  return (
    <Box
      sx={(theme) => ({
        borderRadius: '5px',
        backgroundColor: todo.isDone
          ? alpha(color, theme.palette.action.selectedOpacity)
          : alpha(color, theme.palette.action.disabledOpacity),
        display: 'flex',
        padding: 2,
        gap: 2,
      })}
      className={classes.root}
    >
      <Box>
        <Checkbox
          checked={todo.isDone}
          onClick={() =>
            mutateAsync({ todoID: todo.todoID, isDone: !todo.isDone })
          }
        />
      </Box>
      <Box flexGrow={1}>
        <Typography
          sx={{
            textDecoration: todo.isDone ? 'line-through' : '',
            wordBreak: 'break-word',
          }}
        >
          {todo.title}
        </Typography>
        <Typography
          sx={{
            textDecoration: todo.isDone ? 'line-through' : '',
            wordBreak: 'break-word',
          }}
          variant="caption"
        >
          {todo.description}
        </Typography>
      </Box>
      <Box className="appear-item">
        <IconButton onClick={() => removeTodo(todo.todoID)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
