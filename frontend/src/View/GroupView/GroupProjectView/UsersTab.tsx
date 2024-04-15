import { Box, Typography, List, Divider } from '@mui/material';
import { GroupUser } from '~/api/Group/api';
import { GroupUserCard } from '~/component/GroupUserCard';
import { SearchField } from '~/component/SearchField';

type Props = {
  users: GroupUser[];
  groupId: number;
};

export const UserTab = ({ users, groupId }: Props) => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        gap={2}
        sx={{ padding: 4 }}
      >
        <Typography variant="h5">Explore Users</Typography>
        <Box display={'flex'} gap={2}>
          <SearchField />
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
        {users.map((item) => (
          <Box key={item.userID}>
            <GroupUserCard user={item} groupId={groupId} />
            <Divider />
          </Box>
        ))}
      </List>
    </>
  );
};
