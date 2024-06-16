import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { formatDate } from '~/utils/dateTime';
import { NavLink } from 'react-router-dom';
import { GroupProject } from '~/api/Group/api';
import { GroupProjectMenu } from '../GroupProjectMenu';
import { useGroupContext } from '~/context/GroupRole';
import { ProjectAvatar } from '../ProjectAvatar';

type Props = {
  project: GroupProject;
};

export const GroupProjectCard = ({ project }: Props) => {
  const { isModerator } = useGroupContext();
  return (
    <ListItem sx={{ width: '80vw' }}>
      <List sx={{ flex: 1 }}>
        <Box
          component={NavLink}
          to={`/group/project/${project.groupProjectID}`}
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
        {isModerator && <GroupProjectMenu project={project} />}
      </Box>
    </ListItem>
  );
};
