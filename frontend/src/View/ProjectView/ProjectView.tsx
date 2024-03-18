import {
  AppBar,
  Box,
  Divider,
  LinearProgress,
  List,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { getAllProjects } from '~/api/Projects/query';
import { LoadingView } from '../LoadingView/LoadingView';
import { DialogCreate } from './DialogCreate';
import { ProjectCard } from '~/component/ProjectCard';
import { SearchField } from '~/component/SearchField';

const deriveBarColor = (completion: string) => {
  switch (completion) {
    case 'on Hold':
      return 'inherit';
    case 'Done':
      return 'success';
    default:
      return 'info';
  }
};

export const ProjectView = () => {
  const { data: projects, isLoading } = getAllProjects();

  if (isLoading || projects === undefined) {
    return <LoadingView />;
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Projects
          </Typography>
          <DialogCreate />
        </Toolbar>
      </AppBar>

      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        gap={2}
        sx={{ padding: 4 }}
      >
        <Typography variant="h5">Explore projects</Typography>
        <Box display={'flex'} gap={2}>
          <SearchField />
        </Box>
      </Box>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {projects.map((item) => (
          <Box key={item.projectID}>
            <ProjectCard project={item} />
            <Tooltip arrow title={<Typography>{item.completion}%</Typography>}>
              <LinearProgress
                sx={{
                  width: '20%',
                  marginTop: -1,
                  marginBottom: 2,
                  marginLeft: 2,
                  padding: 0.5,
                }}
                color={deriveBarColor(item.status)}
                variant="determinate"
                value={item.completion}
              />
            </Tooltip>
            <Divider variant="middle" />
          </Box>
        ))}
      </List>
    </Box>
  );
};
