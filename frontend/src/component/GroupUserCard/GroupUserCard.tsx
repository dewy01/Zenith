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
import { mutateLeaveGroup } from '~/api/Group/query';

type Props = {
  user: GroupUser;
  groupId: number;
};

export const GroupUserCard = ({ user, groupId }: Props) => {
  const { mutateAsync: leaveGroup } = mutateLeaveGroup();

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
              <Typography fontSize={18} fontWeight={500} color="text.primary">
                {user.username}
              </Typography>
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
          <IconButton onClick={() => leaveGroup({ groupID: groupId })}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* <ProjectMenu project={project} /> */}
    </ListItem>
  );
};
