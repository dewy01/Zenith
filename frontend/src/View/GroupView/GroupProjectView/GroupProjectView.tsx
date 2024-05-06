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
import { useEffect, useState } from 'react';
import { LoadingView } from '~/View/LoadingView/LoadingView';
import { getGroup, getInviteToken } from '~/api/Group/query';
import { ProjectTab } from './ProjectTab';
import { UserTab } from './UsersTab';
import IosShareIcon from '@mui/icons-material/IosShare';
import { enqueueSnackbar } from 'notistack';
import { DialogCreate } from './DialogCreate';

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
      enqueueSnackbar(`Copied '${token}' to clipboard`);
      setShareButtonClicked(false);
    }
  }, [token, shareButtonClicked]);

  if (isLoading || !group) {
    return <LoadingView />;
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {group.groupName}
          </Typography>
          <DialogCreate groupId={group.groupID} />
          <Tooltip title="Invite users">
            <IconButton
              onClick={() => {
                getNewToken();
                setShareButtonClicked(true);
              }}
            >
              <IosShareIcon sx={{ height: 20, width: 20, color: 'darkgrey' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Projects" />
          <Tab label="Users" />
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
