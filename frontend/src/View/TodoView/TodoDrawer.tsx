import { Trans, t } from '@lingui/macro';
import {
  Box,
  Button,
  List,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { DebouncedFunc } from 'lodash';
import { useEffect, useMemo } from 'react';
import { PaginationRequest } from '~/api/pagination';
import { ProjectTodo } from '~/api/ProjectTodos/api';
import { getProjectTodos } from '~/api/ProjectTodos/query';
import { InfiniteScroll } from '~/component/InfiniteScroll/InfiniteScroll';
import { SearchField } from '~/component/SearchField';
import { SubDrawer } from '~/component/SubDrawer';
import { DialogCreate } from './DialogCreate';
import { DialogDelete } from './DialogDelete';
import { TodoLink } from './TodoLink';
import { ViewMode } from './TodoView';

type Props = {
  handleFilter: DebouncedFunc<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >;
  selectedProject: ProjectTodo | undefined;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectTodo | undefined>
  >;
  query: PaginationRequest;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  pageNumber: number;
};

export const TodoDrawer = ({
  handleFilter,
  selectedProject,
  setSelectedProject,
  viewMode,
  setViewMode,
  query,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getProjectTodos(!!viewMode, query);

  const projects = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.items) : []),
    [data],
  );

  useEffect(() => {
    if (selectedProject) {
      const isStillPresent = projects.some(
        (project) =>
          project && project.projectTodoID === selectedProject.projectTodoID,
      );
      if (!isStillPresent) {
        setSelectedProject(projects[0] ? projects[0] : undefined);
      }
    }
    if (!selectedProject) {
      setSelectedProject(projects[0] ? projects[0] : undefined);
    }
  }, [selectedProject, data, viewMode]);

  const loadNextPage = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SubDrawer>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        sx={{ height: '100%', overflow: 'hidden' }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ maxHeight: '10vh' }}
        >
          <DialogCreate />
          <Typography fontSize={24}>
            <Trans>Todos</Trans>
          </Typography>
          <DialogDelete todoId={selectedProject?.projectTodoID} />
        </Box>
        <SearchField
          onChange={handleFilter}
          placeholder={t({ message: 'Search todos' })}
        />
        <List
          sx={{
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexGrow: 1,
          }}
        >
          <InfiniteScroll
            loadMore={loadNextPage}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
          >
            {projects && projects.length > 0 ? (
              projects.map((project) =>
                project ? (
                  <TodoLink
                    key={project.projectTodoID}
                    project={project}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />
                ) : null,
              )
            ) : (
              <></>
            )}
          </InfiniteScroll>
          <Button variant="text" disabled={!hasNextPage} onClick={loadNextPage}>
            {hasNextPage
              ? t({ message: 'Load more' })
              : t({ message: 'All projects loaded' })}
          </Button>
        </List>
        <ToggleButtonGroup value={viewMode}>
          <ToggleButton
            value={ViewMode.unfinished}
            onClick={() => {
              setViewMode(ViewMode.unfinished);
            }}
            sx={{ width: '50%' }}
          >
            <Trans>Active</Trans>
          </ToggleButton>
          <ToggleButton
            value={ViewMode.completed}
            onClick={() => {
              setViewMode(ViewMode.completed);
            }}
            sx={{ width: '50%' }}
          >
            <Trans>Done</Trans>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </SubDrawer>
  );
};
