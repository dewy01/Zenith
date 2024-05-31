import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingView } from '../LoadingView/LoadingView';
import { NavLink, useParams } from 'react-router-dom';
import { getProjectById } from '~/api/Projects/query';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DialogCreate } from './DialogCreate';
import { ProjectTaskCard } from '~/component/ProjectTaskCard';
import { mutateChangeTaskStatus } from '~/api/ProjectTask/query';
import { Column } from '~/component/Column';

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
