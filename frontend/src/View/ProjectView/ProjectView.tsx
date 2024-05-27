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
import { deriveBarColor } from '~/utils/deriveBarColor';
import { Trans } from '@lingui/react';

export const ProjectView = () => {
  const { data: projects, isLoading } = getAllProjects();

  if (isLoading || projects === undefined) {
    return <LoadingView />;
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Trans id="Projects">Projects</Trans>
          </Typography>
          <SearchField placeholder="Search projects" />
          <DialogCreate />
        </Toolbar>
      </AppBar>

      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          paddingY: 8,
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
