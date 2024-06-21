import {
  Box,
  List,
  Tooltip,
  Typography,
  LinearProgress,
  Divider,
  Pagination,
} from '@mui/material';
import { getAllProjects } from '~/api/Projects/query';
import { PaginationRequest } from '~/api/pagination';
import { ProjectCard } from '~/component/ProjectCard';
import { deriveBarColor } from '~/utils/deriveBarColor';
import { LoadingView } from '../LoadingView/LoadingView';

type ListProps = {
  query: PaginationRequest;
  handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
  pageNumber: number;
};

export const ProjectList = ({
  query,
  handlePageChange,
  pageNumber,
}: ListProps) => {
  const { data, isLoading } = getAllProjects({
    pageNumber: query.pageNumber,
    pageSize: query.pageSize,
    filter: query.filter,
  });

  if (isLoading || data === undefined) {
    return <LoadingView />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingY: 2,
        gap: 2,
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          flexGrow: 1,
          overflowY: 'auto',
          minHeight: 'calc( 100vh - 150px )',
          maxHeight: 'calc( 100vh - 150px )',
          gap: 1,
        }}
      >
        {data.items.map((item) => (
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
      <Box display={'flex'} justifyContent={'center'}>
        <Pagination
          count={data.totalPages}
          page={pageNumber}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
};
