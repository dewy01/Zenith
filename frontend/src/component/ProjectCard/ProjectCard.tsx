import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import { Project } from '~/api/Projects/api';
import { formatDate } from '~/utils/dateTime';
import { ProjectMenu } from '../ProjectMenu';
import { NavLink } from 'react-router-dom';

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
        >
          <ListItemText
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            primary={
              <Typography fontSize={18} fontWeight={500} color="text.primary">
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
      <ListSubheader>
        <Stack alignItems={'end'}>
          <Typography>{project.status}</Typography>
          <Typography variant="caption">
            {formatDate(project.deadline)}
          </Typography>
        </Stack>
      </ListSubheader>
      <ProjectMenu project={project} />
    </ListItem>
  );
};
