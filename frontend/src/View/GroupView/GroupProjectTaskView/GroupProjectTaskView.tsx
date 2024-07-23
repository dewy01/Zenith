import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Column } from '~/component/Column';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { getGroupProjectById } from '~/api/GroupProjects/query';
import { DialogCreate } from './DialogCreate';
import { GroupProjectTaskCard } from '~/component/GroupProjectTaskCard';
import { mutateChangeGroupTaskStatus } from '~/api/GroupProjectTask/query';
import { useGroupContext } from '~/context/GroupRole';
import { GroupRole } from '~/api/Group/api';
import { ProjectTaskStatus } from '~/api/Projects/api';

type Params = {
  id: string;
};

export const GroupProjectTaskView = () => {
  const theme = useTheme();
  const { userRole } = useGroupContext();

  const data = useParams<Params>();
  if (data.id === undefined) return;

  const { data: project, isLoading } = getGroupProjectById(data.id);
  const { mutateAsync } = mutateChangeGroupTaskStatus();

  if (isLoading || project === undefined) {
    return <LoadingView />;
  }

  return (
    <Box>
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              sx={(theme) => ({
                color: theme.palette.getContrastText(
                  theme.palette.primary.main,
                ),
              })}
              component={NavLink}
              to="/group"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ textDecoration: 'none', paddingLeft: 3, flexGrow: 1 }}>
              <Typography variant="h6">{project.title}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {project.description}
              </Typography>
            </Box>
            <DialogCreate projectId={project.projectID} />
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="space-evenly" alignItems="start">
          <Column
            name={'Backlog'}
            column={ProjectTaskStatus.Backlog}
            color={theme.palette.error.main}
            mutateStatus={mutateAsync}
          >
            {project.backlog.map((task) => (
              <GroupProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'in Progress'}
            column={ProjectTaskStatus.InProgress}
            color={theme.palette.warning.main}
            mutateStatus={mutateAsync}
          >
            {project.inProgress.map((task) => (
              <GroupProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'For Review'}
            column={ProjectTaskStatus.ForReview}
            color={theme.palette.info.main}
            mutateStatus={mutateAsync}
          >
            {project.review.map((task) => (
              <GroupProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'Closed'}
            column={ProjectTaskStatus.Closed}
            color={theme.palette.success.main}
            mutateStatus={userRole !== GroupRole.User ? mutateAsync : () => {}}
          >
            {project.closed.map((task) => (
              <GroupProjectTaskCard task={task} key={JSON.stringify(task)} />
            ))}
          </Column>
        </Box>
      </Box>
    </Box>
  );
};
