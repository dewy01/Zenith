import { Box } from '@mui/material';
import { NoGroupView } from './NoGroupView';
import { getIsInGroup } from '~/api/Group/query';
import { LoadingView } from '../LoadingView/LoadingView';

export const GroupView = () => {
  const { data: group, isLoading } = getIsInGroup();

  if (isLoading) {
    return <LoadingView />;
  }

  return <Box>{group ? <>Youre in a group</> : <NoGroupView />}</Box>;
};
