import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { Project } from '~/api/Projects/api';
import { formatDate } from '~/utils/dateTime';
import { ProjectMenu } from '../ProjectMenu';
import { NavLink } from 'react-router-dom';
import { ProjectAvatar } from '../ProjectAvatar';

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <ListItem sx={{ width: '80vw' }}>
      <List sx={{ flex: 1 }}>
        <Box
          component={NavLink}
          to={`/projects/${project.projectID}`}
          sx={{ textDecoration: 'none' }}
          display="flex"
          alignItems="center"
          gap={2}
        >
          <ProjectAvatar name={project.title} />
          <ListItemText
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              color: theme.palette.text.primary,
              '&:hover': {
                textDecoration: 'underline',
                textDecorationColor: theme.palette.text.secondary,
              },
            })}
            primary={
              <Typography fontSize={18} fontWeight={500}>
                {project.title}
              </Typography>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {project.description}
              </Typography>
            }
          />
        </Box>
      </List>

      <Box display="flex" gap={2}>
        <Stack alignItems={'end'}>
          <Typography color="text.secondary">{project.status}</Typography>
          <Typography
            sx={(theme) => ({
              color: project.isOutdated
                ? theme.palette.error.light
                : 'text.secondary',
            })}
            variant="caption"
          >
            {formatDate(project.deadline)}
          </Typography>
        </Stack>
        <ProjectMenu project={project} />
      </Box>
    </ListItem>
  );
};
