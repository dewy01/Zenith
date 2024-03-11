import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { LoadingView } from '../LoadingView/LoadingView';
import { NavLink, useParams } from 'react-router-dom';
import { getProjectById } from '~/api/Projects/query';
import { ProjectView } from '../ProjectView/ProjectView';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DialogCreate } from './DialogCreate';
import { ProjectTaskCard } from '~/component/ProjectTaskCard';
import { mutateChangeTaskStatus } from '~/api/ProjectTask/query';
import { changeTaskStatus } from '~/api/ProjectTask/api';

type Params = {
  id: string;
};

const columns = [
  { name: 'Backlog', color: '#ff927e' },
  { name: 'in Progress', color: '#e5cc8b' },
  { name: 'For Review', color: '#6faad6' },
  { name: 'Closed', color: '#9bcaa8' },
];

export const ProjectTaskView = () => {
  const data = useParams<Params>();
  if (data.id === undefined) return <ProjectView />;

  const { data: project, isLoading } = getProjectById(data.id);
  const { mutateAsync } = mutateChangeTaskStatus();

  if (isLoading || project === undefined) {
    return <LoadingView />;
  }

  const updateTask = (task: changeTaskStatus) => {
    if (task) {
      mutateAsync(task);
    }
  };

  return (
    <Box>
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton component={NavLink} to="/projects">
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
            <DialogCreate projectId={project.projectID} />
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="space-evenly" alignItems="start">
          {columns.map((column) => (
            <>
              <Box
                key={column.name}
                display="flex"
                flexDirection="column"
                sx={{
                  minWidth: '200px',
                  width: '25%',
                  padding: 1,
                }}
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Box
                  sx={{
                    backgroundColor: column.color,
                    width: '90%',
                    borderRadius: 5,
                  }}
                >
                  <Typography textAlign="center">{column.name}</Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  sx={{
                    minWidth: '200px',
                    width: '80%',
                    minHeight: '80vh',
                  }}
                >
                  {project.projectTasks
                    .filter((task) => task.status === column.name)
                    .map((task) => (
                      <ProjectTaskCard task={task} key={task.projectTaskID} />
                    ))}
                </Box>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ minHeight: '90vh' }}
              />
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
