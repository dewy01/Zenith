import {
  Box,
  List,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { getProjectTodos } from '~/api/ProjectTodos/query';
import { Main } from '~/component/Main';
import { SearchField } from '~/component/SearchField';
import { SubDrawer } from '~/component/SubDrawer';
import { useEffect, useRef, useState } from 'react';
import { DialogCreate } from './DialogCreate';
import { DialogDelete } from './DialogDelete';
import { TodoPreview } from './TodoPreview';
import { ProjectTodo } from '~/api/ProjectTodos/api';
import { debounce } from 'lodash';
import { Trans, t } from '@lingui/macro';
import { NoTodoView } from './NoTodoView';
import { TodoLink } from './TodoLink';

enum ViewMode {
  unfinished,
  completed,
}

export const TodoView = () => {
  const { data: projects } = getProjectTodos();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.unfinished);
  const [selectedProject, setSelectedProject] = useState<
    ProjectTodo | undefined
  >(projects?.doneProjects.at(0));

  useEffect(() => {
    const allProjects =
      viewMode === ViewMode.unfinished
        ? projects?.undoneProjects
        : projects?.doneProjects;

    if (selectedProject && allProjects) {
      const isStillPresent = allProjects.some(
        (project) => project.projectTodoID === selectedProject.projectTodoID,
      );
      if (!isStillPresent) {
        setSelectedProject(allProjects[0] ? allProjects[0] : undefined);
      }
    }
    if (!selectedProject && allProjects) {
      setSelectedProject(allProjects[0] ? allProjects[0] : undefined);
    }
  }, [selectedProject, projects, viewMode]);

  const [filter, setFilter] = useState<string>('');

  const handleFilter = useRef(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value),
      500,
    ),
  ).current;

  const filteredProjects = projects
    ? (viewMode === ViewMode.unfinished
        ? projects.undoneProjects
        : projects.doneProjects) || []
    : [];

  return (
    <Main>
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
            {filteredProjects.length > 0 ? (
              filteredProjects
                .filter((project) =>
                  project.title
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase()),
                )
                .map((project) => (
                  <TodoLink
                    key={project.projectTodoID}
                    project={project}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />
                ))
            ) : (
              <></>
            )}
          </List>
          <ToggleButtonGroup value={viewMode}>
            <ToggleButton
              value={ViewMode.unfinished}
              onClick={() => {
                setViewMode(ViewMode.unfinished);
              }}
              sx={{ width: '50%' }}
            >
              Active
            </ToggleButton>
            <ToggleButton
              value={ViewMode.completed}
              onClick={() => {
                setViewMode(ViewMode.completed);
              }}
              sx={{ width: '50%' }}
            >
              Done
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </SubDrawer>
      <Box sx={{ flexGrow: 1 }}>
        {selectedProject ? (
          <TodoPreview
            key={selectedProject.projectTodoID}
            projectId={selectedProject.projectTodoID}
          />
        ) : (
          <NoTodoView />
        )}
      </Box>
    </Main>
  );
};
