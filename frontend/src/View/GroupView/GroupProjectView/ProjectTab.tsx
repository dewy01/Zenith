import {
  Box,
  Typography,
  List,
  Tooltip,
  LinearProgress,
  Divider,
} from '@mui/material';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { getAllGroupProjects } from '~/api/GroupProjects/query';
import { GroupProjectCard } from '~/component/GroupProjectCard/GroupProjectCard';
import { SearchField } from '~/component/SearchField';
import { deriveBarColor } from '~/utils/deriveBarColor';

export const ProjectTab = () => {
  const { data: group, isLoading } = getAllGroupProjects();

  if (isLoading || !group) {
    return <LoadingView />;
  }
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        gap={2}
        sx={{ padding: 4 }}
      >
        <Typography variant="h5">Explore projects</Typography>
        <Box display={'flex'} gap={2}>
          <SearchField placeholder="Search projects" />
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
        {group.map((item) => (
          <Box key={item.groupProjectID}>
            <GroupProjectCard project={item} />
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
    </>
  );
};
