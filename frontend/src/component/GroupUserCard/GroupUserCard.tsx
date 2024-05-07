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
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {
  mutateChangeRole,
  mutateLeaveGroup,
  mutateSetAdmin,
} from '~/api/Group/query';
import { getGroupRole } from '~/utils/useGroupRoles';
import { useGroupContext } from '~/context/GroupRole';

type Props = {
  user: GroupUser;
  groupId: number;
};

export const GroupUserCard = ({ user, groupId }: Props) => {
  const { mutateAsync: leaveGroup } = mutateLeaveGroup();
  const { mutateAsync: changeRole } = mutateChangeRole();
  const { mutateAsync: setAdmin } = mutateSetAdmin();
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
        <Tooltip title={'Leave group'}>
          <IconButton
            disabled={isGranted}
            onClick={() => leaveGroup({ groupID: groupId })}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      )}
      {!user.isMe && isGranted && (
        <>
          <Tooltip title={'Grant admin'}>
            <IconButton onClick={() => setAdmin({ userId: user.userID })}>
              <VerifiedUserIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Switch role ( User / Moderator )'}>
            <IconButton onClick={() => changeRole({ userId: user.userID })}>
              <CompareArrowsIcon />
            </IconButton>
          </Tooltip>
        </>
      )}

      {/* <ProjectMenu project={project} /> */}
    </ListItem>
  );
};
