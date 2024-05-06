import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import { formatDate } from '~/utils/dateTime';
import { NavLink } from 'react-router-dom';
import { GroupProject } from '~/api/Group/api';
import { GroupProjectMenu } from '../GroupProjectMenu';

type Props = {
  project: GroupProject;
};

export const GroupProjectCard = ({ project }: Props) => {
  return (
    <ListItem sx={{ width: '80vw' }}>
      <List sx={{ flex: 1 }}>
        <Box
          component={NavLink}
          to={`/group/project/${project.groupProjectID}`}
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
      <GroupProjectMenu project={project} />
    </ListItem>
  );
};
