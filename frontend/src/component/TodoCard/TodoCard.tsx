import { Box, Checkbox, Typography, alpha } from '@mui/material';
import { todoModel } from '~/View/TodoView/TodoTask/schema';

type Props = {
  todo: todoModel;
  color: string;
};

export const TodoCard = ({ todo, color }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        borderRadius: '5px',
        backgroundColor: alpha(color, theme.palette.action.selectedOpacity),
        display: 'flex',
        padding: 2,
      })}
    >
      <Box>
        <Checkbox defaultChecked />
      </Box>
      <Box>
        <Typography>{todo.title}</Typography>
        <Typography variant="caption">{todo.description}</Typography>
      </Box>
    </Box>
  );
};
