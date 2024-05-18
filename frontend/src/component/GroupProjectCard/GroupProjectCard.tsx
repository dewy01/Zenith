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
import { useGroupContext } from '~/context/GroupRole';

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
        >
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
      <ListSubheader>
        <Stack alignItems={'end'}>
          <Typography>{project.status}</Typography>
          <Typography
            variant="caption"
            sx={(theme) => ({
              color: project.isOutdated
                ? theme.palette.error.light
                : 'text.secondary',
            })}
          >
            {formatDate(project.deadline)}
          </Typography>
        </Stack>
      </ListSubheader>
      {isModerator && <GroupProjectMenu project={project} />}
    </ListItem>
  );
};
