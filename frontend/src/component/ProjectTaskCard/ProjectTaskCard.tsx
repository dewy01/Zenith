import React, { useState } from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { ProjectTask } from '~/api/Projects/api';
import { pulseScale } from '~/Theme/Animations';

type Props = {
  task: ProjectTask;
};

export const ProjectTaskCard: React.FC<Props> = ({ task }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const cloneRef = React.useRef();

  const handleOnDragStart = (e: any) => {
    setIsHovering(true);
    e.dataTransfer.setData('taskId', task.projectTaskID.toString());
    e.dataTransfer.setData('taskColumn', task.status);

    // TODO: think about using cloned object to manage styling
    const node = e.target.cloneNode(true);
    const clone = node?.cloneNode(true) as any;
    if (clone) {
      clone.style.width = '250px';
      clone.style.opacity = '1';
      clone.style.position = 'absolute';
      clone.style.display = 'block';
      clone.style.top = '-150px';
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(clone as Element, 0, 0);
      cloneRef.current = clone;
    }
  };

  const handleOnDragEnd = (e: any) => {
    const clone = cloneRef.current as any;
    if (clone) clone.remove();

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
        animation: isHovering ? `${pulseScale} 2s infinite` : '',
        opacity: isHovering ? 0.3 : 1,
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
