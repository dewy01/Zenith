import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { GroupUser } from '~/api/Group/api';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { mutateChangeRole, mutateLeaveGroup } from '~/api/Group/query';
import { getGroupRole } from '~/utils/useGroupRoles';
import { useGroupContext } from '~/context/GroupRole';
import { SetAdminDialog } from './SetAdminDialog';
import { Trans } from '@lingui/macro';
import { RemoveGroupDialog } from './RemoveGroupDialog';

type Props = {
  user: GroupUser;
  groupId: number;
};

export const GroupUserCard = ({ user, groupId }: Props) => {
  const { mutateAsync: leaveGroup } = mutateLeaveGroup();
  const { mutateAsync: changeRole } = mutateChangeRole();
  const { isGranted } = useGroupContext();

  return (
    <ListItem
      sx={(theme) => ({
        width: '80vw',
        '&:hover': { backgroundColor: theme.palette.action.hover },
        transition: 'background-color 0.15s ease',
      })}
    >
      <List sx={{ flex: 1 }}>
        <Box>
          <ListItemText
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            primary={
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Typography fontSize={18} fontWeight={500} color="text.primary">
                  {user.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {getGroupRole(user.userRole)}
                </Typography>
              </Box>
            }
            secondary={
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            }
          />
        </Box>
      </List>

      {user.isMe && (
        <>
          <Tooltip title={<Trans>Leave group</Trans>}>
            <IconButton
              disabled={isGranted}
              onClick={() => leaveGroup({ groupID: groupId })}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {user.isMe && isGranted && <RemoveGroupDialog groupId={groupId} />}
      {!user.isMe && isGranted && (
        <>
          <SetAdminDialog userId={user.userID} />
          <Tooltip title={<Trans>Switch role ( User / Moderator )</Trans>}>
            <IconButton onClick={() => changeRole({ userId: user.userID })}>
              <CompareArrowsIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </ListItem>
  );
};
