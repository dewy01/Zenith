import { Trans, t } from '@lingui/macro';
import { Box, Typography, List, Divider } from '@mui/material';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { GroupUser } from '~/api/Group/api';
import { GroupUserCard } from '~/component/GroupUserCard';
import { SearchField } from '~/component/SearchField';

type Props = {
  users: GroupUser[];
  groupId: number;
};

export const UserTab = ({ users, groupId }: Props) => {
  const [filter, setFilter] = useState<string>('');

  const handleFilter = useRef(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value),
      500,
    ),
  ).current;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        gap={2}
        sx={{ padding: 4 }}
      >
        <Typography variant="h5">
          <Trans>Explore Users</Trans>
        </Typography>
        <Box display={'flex'} gap={2}>
          <SearchField
            onChange={handleFilter}
            placeholder={t({ message: 'Search users' })}
          />
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
        {users
          .filter((a) =>
            a.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
          )
          .map((item) => (
            <Box key={item.userID}>
              <GroupUserCard user={item} groupId={groupId} />
              <Divider />
            </Box>
          ))}
      </List>
    </>
  );
};
