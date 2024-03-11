import React from 'react';
import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import { ProjectTask } from '~/api/Projects/api';

type Props = {
  task: ProjectTask;
};

export const ProjectTaskCard: React.FC<Props> = ({ task }) => {
  return (
    <Card draggable key={task.projectTaskID} sx={{ cursor: 'grab' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <Box>
        <Chip label={task.category} />
      </Box>
    </Card>
  );
};

export default ProjectTaskCard;
