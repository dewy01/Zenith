import { Box } from '@mui/material';
import { Main } from '~/component/Main';
import { useRef, useState } from 'react';
import { TodoPreview } from './TodoPreview';
import { ProjectTodo } from '~/api/ProjectTodos/api';
import { debounce } from 'lodash';
import { NoTodoView } from './NoTodoView';
import { TodoDrawer } from './TodoDrawer';

export enum ViewMode {
  unfinished,
  completed,
}

export const TodoView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.unfinished);
  const [selectedProject, setSelectedProject] = useState<
    ProjectTodo | undefined
  >(undefined);

  const pageNumber = 1;
  const [filter, setFilter] = useState<string>('');
  const pageSize = 5;

  const handleFilter = useRef(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value),
      500,
    ),
  ).current;

  return (
    <Main>
      <TodoDrawer
        handleFilter={handleFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
        query={{ pageNumber: pageNumber, pageSize: pageSize, filter: filter }}
        pageNumber={pageNumber}
      />
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
