import { AppBar, Box, Divider, List, Toolbar, Typography } from '@mui/material';
import { getAllProjects } from '~/api/Projects/query';
import { LoadingView } from '../LoadingView/LoadingView';
import { DialogCreate } from './DialogCreate';
import { ProjectCard } from '~/component/ProjectCard';
import { SearchField } from '~/component/SearchField';

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
        }}
      >
        {projects.map((item) => (
          <div key={item.projectID}>
            <ProjectCard project={item} />
            <Divider variant="middle" />
          </div>
        ))}
      </List>
    </Box>
  );
};
