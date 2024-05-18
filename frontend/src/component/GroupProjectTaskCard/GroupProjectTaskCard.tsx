import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Tooltip,
  Typography,
} from '@mui/material';
import { pulseScale } from '~/Theme/Animations';
import { GroupProjectTask } from '~/api/GroupProjectTask/api';
import { stringAvatar } from '~/utils/userAvatar';
import { DialogEdit } from '~/View/GroupView/GroupProjectTaskView/DialogEdit';

type Props = {
  task: GroupProjectTask;
};

export const GroupProjectTaskCard: React.FC<Props> = ({ task }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const cloneRef = React.useRef();

  const handleOnDragStart = (e: any) => {
    if (!task.canEdit) {
      e.preventDefault();
      return;
    }

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
        cursor: !task.canEdit ? 'cursor' : 'grab',
        backgroundColor: isHovering ? theme.palette.action.focus : '',
        animation: isHovering ? `${pulseScale} 2s infinite` : '',
        opacity: isHovering ? 0.3 : 1,
        '&: hover': {
          transition: '0.1s ease',
          backgroundColor: theme.palette.action.hover,
        },
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
          {task.canEdit ? (
            <DialogEdit task={task} />
          ) : (
            <>
              <Typography gutterBottom fontSize={20} component="div">
                {task.title}
              </Typography>
            </>
          )}

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
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip title={task.user}>
          <Avatar {...stringAvatar(task.user)} />
        </Tooltip>
        <Chip
          variant="outlined"
          label={<Typography fontSize={12}>{task.category}</Typography>}
        />
      </Box>
    </Card>
  );
};

export default GroupProjectTaskCard;
