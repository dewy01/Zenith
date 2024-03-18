import React, { cloneElement, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from '@mui/material';
import { ProjectTask } from '~/api/Projects/api';

type Props = {
  task: ProjectTask;
};

export const ProjectTaskCard: React.FC<Props> = ({ task }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  //const [clone, setClone] = useState<any | null>(null);

  const handleOnDragStart = (e: React.DragEvent) => {
    setIsHovering(true);
    e.dataTransfer.setData('taskId', task.projectTaskID.toString());
    e.dataTransfer.setData('taskColumn', task.status);

    // TODO: think about using cloned object to manage styling
    // const node = document.getElementById(task.projectTaskID.toString());
    // setClone(node?.cloneNode(true) as Element);
    // if (clone) {
    //   const theme = useTheme();
    //   clone.style.width = '18vw';
    //   clone.style.diplay = 'transform: translateX(-500px)';
    //   clone.style.backgroundColor = 'red';
    //   document.body.appendChild(clone);
    //   e.dataTransfer.setDragImage(clone as Element, 0, 0);
    // }
  };

  const handleOnDragEnd = (e: React.DragEvent) => {
    //document.body.removeChild(clone);
    setIsHovering(false);
    e.preventDefault();
  };

  return (
    <Card
      draggable
      key={task.projectTaskID}
      id={`${task.projectTaskID}`}
      sx={(theme) => ({
        cursor: 'grab',
        backgroundColor: isHovering ? theme.palette.action.focus : '',
      })}
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            marginBottom: -2,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {task.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {task.description}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ padding: 1 }}>
        <Chip label={<Typography fontSize={12}>{task.category}</Typography>} />
      </Box>
    </Card>
  );
};

export default ProjectTaskCard;
