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
import { ProjectTaskCard } from '~/component/ProjectTaskCard';
import { mutateChangeTaskStatus } from '~/api/ProjectTask/query';
import { Column } from '~/component/Column';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { getGroupProjectById } from '~/api/GroupProjects/query';

type Params = {
  id: string;
};

export const GroupProjectTaskView = () => {
  const theme = useTheme();

  const data = useParams<Params>();
  if (data.id === undefined) return;

  const { data: project, isLoading } = getGroupProjectById(data.id);
  const { mutateAsync } = mutateChangeTaskStatus();

  if (isLoading || project === undefined) {
    return <LoadingView />;
  }

  return (
    <Box>
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton component={NavLink} to="/group">
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ textDecoration: 'none', paddingLeft: 3, flexGrow: 1 }}>
              <Typography variant="h6" color="text.primary">
                {project.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {project.description}
              </Typography>
            </Box>
            {/* <DialogCreate projectId={project.projectID} /> */}
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="space-evenly" alignItems="start">
          <Column
            name={'Backlog'}
            color={theme.palette.error.main}
            mutateStatus={mutateAsync}
          >
            {project.backlog.map((task) => (
              <ProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'in Progress'}
            color={theme.palette.warning.main}
            mutateStatus={mutateAsync}
          >
            {project.inProgress.map((task) => (
              <ProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'For Review'}
            color={theme.palette.info.main}
            mutateStatus={mutateAsync}
          >
            {project.review.map((task) => (
              <ProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'Closed'}
            color={theme.palette.success.main}
            mutateStatus={mutateAsync}
          >
            {project.closed.map((task) => (
              <ProjectTaskCard task={task} key={JSON.stringify(task)} />
            ))}
          </Column>
        </Box>
      </Box>
    </Box>
  );
};
