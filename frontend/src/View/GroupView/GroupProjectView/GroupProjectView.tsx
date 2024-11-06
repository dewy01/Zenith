import { Trans, t } from '@lingui/macro';
import IosShareIcon from '@mui/icons-material/IosShare';
import {
  AppBar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { getGroup, getInviteToken, getOwnRole } from '~/api/Group/query';
import { useGroupContext } from '~/context/GroupRole';
import { DialogCreate } from './DialogCreate';
import { ProjectTab } from './ProjectTab';
import { DialogUpdate } from './UpdateGroup/DialogUpdate';
import { UserTab } from './UsersTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const GroupProjectView = () => {
  const { data: group, isLoading } = getGroup();
  const { data: role } = getOwnRole();
  const { setUserRole, isModerator, isGranted } = useGroupContext();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  const { data: token, refetch: getNewToken } = getInviteToken(
    group ? group.groupID : 0,
  );
  const [shareButtonClicked, setShareButtonClicked] = useState(false);

  useEffect(() => {
    if (token && shareButtonClicked) {
      navigator.clipboard.writeText(token);
      enqueueSnackbar(
        `${t({ message: 'Copied' })} ${token} ${t({ message: 'to clipboard' })}`,
      );
      setShareButtonClicked(false);
    }
  }, [token, shareButtonClicked]);

  useEffect(() => {
    if (role) {
      setUserRole(role);
    }
  }, [role]);

  if (isLoading || !group) {
    return <LoadingView />;
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          {isGranted ? (
            <DialogUpdate title={group.groupName} groupId={group.groupID} />
          ) : (
            <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
              {group.groupName}
            </Typography>
          )}
          {isModerator && (
            <>
              <DialogCreate groupId={group.groupID} />
              <Tooltip title={<Trans>Invite users</Trans>}>
                <IconButton
                  onClick={() => {
                    getNewToken();
                    setShareButtonClicked(true);
                  }}
                >
                  <IosShareIcon
                    sx={(theme) => ({
                      height: 20,
                      width: 20,
                      opacity: 0.5,
                      color: theme.palette.getContrastText(
                        theme.palette.primary.main,
                      ),
                    })}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label={t({ message: 'Projects' })} />
          <Tab label={t({ message: 'Users' })} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProjectTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserTab users={group.users} groupId={group.groupID} />
      </TabPanel>
    </Box>
  );
};
