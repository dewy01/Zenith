import { Box } from '@mui/material';
import { Suspense } from 'react';
import { getIsInGroup } from '~/api/Group/query';
import { getSettings } from '~/api/Settings/query';
import { LoadingView } from '../LoadingView/LoadingView';
import { EventSection } from './Sections/EventSection';
import { GroupProjectSection } from './Sections/GroupProjectSection';
import { NoteSection } from './Sections/NoteSection';
import { ProjectSection } from './Sections/ProjectSection';
import { TodoSection } from './Sections/TodoSection';

export const DashboardView = () => {
  const { data: group, isLoading: isLoadingGroup } = getIsInGroup();
  const { data: settings, isLoading } = getSettings();

  if (!settings || isLoading || isLoadingGroup || group === undefined)
    return <LoadingView />;

  const { routes } = settings;

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={4}
      gap={6}
      overflow={'auto'}
    >
      <Suspense fallback={<LoadingView />}>
        <Box
          display="flex"
          padding={2}
          flexWrap="wrap"
          gap={6}
          overflow={'auto'}
        >
          {routes['Todo'] && <TodoSection />}
          {routes['Calendar'] && <EventSection />}
          {routes['Notes'] && <NoteSection />}
          {routes['Projects'] && <ProjectSection />}
          {routes['Group Projects'] && group !== false && (
            <GroupProjectSection />
          )}
        </Box>
      </Suspense>
    </Box>
  );
};
