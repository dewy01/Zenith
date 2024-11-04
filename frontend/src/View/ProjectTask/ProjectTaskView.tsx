import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { ProjectTaskStatus } from '~/api/Projects/api';
import { getProjectById } from '~/api/Projects/query';
import { mutateChangeTaskStatus } from '~/api/ProjectTask/query';
import { Column } from '~/component/Column';
import { ProjectTaskCard } from '~/component/ProjectTaskCard';
import { LoadingView } from '../LoadingView/LoadingView';
import { DialogCreate } from './DialogCreate';

type Params = {
  id: string;
};

export const ProjectTaskView = () => {
  const theme = useTheme();

  const data = useParams<Params>();
  if (data.id === undefined) return;

  const { data: project, isLoading } = getProjectById(data.id);
  const { mutateAsync } = mutateChangeTaskStatus();

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
              to="/projects"
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
              <ProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'in Progress'}
            column={ProjectTaskStatus.InProgress}
            color={theme.palette.warning.main}
            mutateStatus={mutateAsync}
          >
            {project.inProgress.map((task) => (
              <ProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'For Review'}
            column={ProjectTaskStatus.ForReview}
            color={theme.palette.info.main}
            mutateStatus={mutateAsync}
          >
            {project.review.map((task) => (
              <ProjectTaskCard task={task} key={task.projectTaskID} />
            ))}
          </Column>

          <Column
            name={'Closed'}
            column={ProjectTaskStatus.Closed}
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
