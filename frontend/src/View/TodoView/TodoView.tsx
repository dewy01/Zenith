import { Box, List, Typography } from '@mui/material';
import { getProjectTodos } from '~/api/ProjectTodos/query';
import { Main } from '~/component/Main';
import { SearchField } from '~/component/SearchField';
import { SubDrawer } from '~/component/SubDrawer';
import { useEffect, useRef, useState } from 'react';
import { DrawerLink } from '../NotesView/DrawerLink';
import { DialogCreate } from './DialogCreate';
import { DialogDelete } from './DialogDelete';
import { TodoPreview } from './TodoPreview';
import { ProjectTodo } from '~/api/ProjectTodos/api';
import { DialogEdit } from './DialogEdit';
import { debounce } from 'lodash';

export const TodoView = () => {
  const [selectedProject, setSelectedProject] = useState<
    ProjectTodo | undefined
  >(undefined);
  const { data: projects } = getProjectTodos();

  useEffect(() => {
    if (selectedProject && projects) {
      const isStillPresent = projects.some(
        (project) => project.projectTodoID === selectedProject.projectTodoID,
      );
      if (!isStillPresent) {
        setSelectedProject(projects[0] ? projects[0] : undefined);
      }
    }
    if (!selectedProject && projects) {
      setSelectedProject(projects[0] ? projects[0] : undefined);
    }
  }, [selectedProject, projects]);

  const [filter, setFilter] = useState<string>('');

  const handleFilter = useRef(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value),
      500,
    ),
  ).current;

  return (
    <Main>
      <SubDrawer>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          sx={{ overflow: 'hidden' }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ maxHeight: '10vh' }}
          >
            <DialogCreate />
            <Typography fontSize={24}>Todos</Typography>
            <DialogDelete todoId={selectedProject?.projectTodoID} />
          </Box>
          <SearchField onChange={handleFilter} />
          <List
            sx={{
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {projects ? (
              projects
                .filter((a) =>
                  a.title
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase()),
                )
                .map((project) => (
                  <Box
                    onClick={() => setSelectedProject(project)}
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <DrawerLink
                      key={project.projectTodoID}
                      isActive={
                        project.projectTodoID === selectedProject?.projectTodoID
                      }
                      color={project.color}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box flexGrow={1}>
                          <Typography
                            sx={{
                              textWrap: 'wrap',
                              wordBreak: 'break-word',
                            }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              textWrap: 'wrap',
                              wordBreak: 'break-word',
                            }}
                          >
                            {project.description}
                          </Typography>
                        </Box>
                        {project.projectTodoID ===
                          selectedProject?.projectTodoID && (
                          <DialogEdit project={selectedProject} />
                        )}
                      </Box>
                    </DrawerLink>
                  </Box>
                ))
            ) : (
              <></>
            )}
          </List>
        </Box>
      </SubDrawer>
      <Box>
        {selectedProject ? (
          <TodoPreview
            key={selectedProject.projectTodoID}
            projectId={selectedProject.projectTodoID}
          />
        ) : (
          <></>
        )}
      </Box>
    </Main>
  );
};
