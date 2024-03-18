import { Box, Typography, alpha } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { changeTaskStatus } from '~/api/ProjectTask/api';
import { mutateChangeTaskStatus } from '~/api/ProjectTask/query';

type Props = {
  name: string;
  color: string;
  children: ReactNode;
};

export const Column = ({ name, color, children }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { mutateAsync } = mutateChangeTaskStatus();
  const updateTask = (task: changeTaskStatus) => {
    if (task) {
      mutateAsync(task);
    }
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    const taskId = e.dataTransfer.getData('taskId');
    const taskColumn = e.dataTransfer.getData('taskColumn');
    if (taskColumn !== name) {
      updateTask({ status: { status: name }, projectTaskID: taskId });
    }
  };

  const handleOnDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleOnDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
  };
  return (
    <>
      <Box
        onDragOver={(e) => handleOnDragOver(e)}
        onDrop={handleOnDrop}
        onDragEnter={handleOnDragEnter}
        onDragLeave={handleOnDragLeave}
        key={name}
        display="flex"
        flexDirection="column"
        sx={(theme) => ({
          justifyContent: 'flex-start',
          minWidth: '200px',
          width: '25%',
          padding: 1,
          backgroundColor: isHovering
            ? alpha(theme.palette.action.focus, 0.02)
            : '',
          transition: '0.08s ease-in',
          minHeight: '90vh',
          height: 'auto',
          borderRight: '1px solid',
          borderColor: theme.palette.action.focus,
        })}
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Box
          sx={{
            width: '80%',
            padding: 2,
            backgroundColor: color,
            borderRadius: '5px',
          }}
        >
          <Typography
            textAlign="center"
            fontWeight={500}
            sx={(theme) => ({
              color: theme.palette.common.white,
            })}
          >
            {name}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{
            minWidth: '200px',
            width: '80%',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};
