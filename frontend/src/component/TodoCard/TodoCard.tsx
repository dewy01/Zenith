import { Box, Checkbox, Typography, alpha } from "@mui/material";
import { Todo } from "~/api/ProjectTodos/api";
import { mutateToggleTodo } from "~/api/Todos/query";

type Props = {
  todo: Todo;
  color: string;
};

export const TodoCard = ({ todo, color }: Props) => {
  const { mutateAsync } = mutateToggleTodo();

  return (
    <Box
      sx={(theme) => ({
        borderRadius: "5px",
        backgroundColor: todo.isDone
          ? alpha(color, theme.palette.action.selectedOpacity)
          : alpha(color, theme.palette.action.disabledOpacity),
        display: "flex",
        padding: 2,
        gap: 2,
      })}
    >
      <Box>
        <Checkbox
          checked={todo.isDone}
          onClick={() =>
            mutateAsync({ todoID: todo.todoID, isDone: !todo.isDone })
          }
        />
      </Box>
      <Box>
        <Typography
          sx={{
            textDecoration: todo.isDone ? "line-through" : "",
            wordBreak: "break-word",
          }}
        >
          {todo.title}
        </Typography>
        <Typography
          sx={{
            textDecoration: todo.isDone ? "line-through" : "",
            wordBreak: "break-word",
          }}
          variant="caption"
        >
          {todo.description}
        </Typography>
      </Box>
    </Box>
  );
};
