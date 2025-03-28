import { Box } from '@mui/material';
import { NoGroupView } from './NoGroupView';
import { getIsInGroup } from '~/api/Group/query';
import { LoadingView } from '../LoadingView/LoadingView';
import { GroupProjectView } from './GroupProjectView/GroupProjectView';

export const GroupView = () => {
  const { data: group, isLoading } = getIsInGroup();

  if (isLoading) {
    return <LoadingView />;
  }

  return <Box>{group ? <GroupProjectView /> : <NoGroupView />}</Box>;
};
