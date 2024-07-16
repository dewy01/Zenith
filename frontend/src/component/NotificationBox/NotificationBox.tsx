import {
  Accordion,
  AccordionSummary,
  Box,
  Typography,
  AccordionDetails,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  getAllNotifications,
  mutateMarkAsRead,
} from '~/api/Notifications/query';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Trans } from '@lingui/macro';

export const NotificationBox = () => {
  const { data } = getAllNotifications();
  const { mutateAsync } = mutateMarkAsRead();
  const isEmpty =
    data?.calendarEventNotifications.length === 0 &&
    data?.groupProjectNotifications.length === 0 &&
    data?.projectNotifications.length === 0;

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 2,
            }}
          >
            <NotificationsIcon />
            <Typography
              fontWeight={500}
              fontSize={20}
              sx={{ width: '33%', flexShrink: 0 }}
            >
              <Trans>Notifications</Trans>
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: '180px',
            overflow: 'auto',
          }}
        >
          {!isEmpty ? (
            <>
              {data?.calendarEventNotifications.map((item) => (
                <NotificationRow
                  key={item.notificationID}
                  item={item}
                  markAsRead={mutateAsync}
                />
              ))}
              {data?.projectNotifications.map((item) => (
                <NotificationRow
                  key={item.notificationID}
                  item={item}
                  markAsRead={mutateAsync}
                />
              ))}
              {data?.groupProjectNotifications.map((item) => (
                <NotificationRow
                  key={item.notificationID}
                  item={item}
                  markAsRead={mutateAsync}
                />
              ))}
            </>
          ) : (
            <Paper sx={{ padding: 2 }} elevation={10}>
              No notifications
            </Paper>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

type NotificationRowProps = {
  notificationID: number;
  message: string;
  dateTime: Date;
  isActive: boolean;
  isRead: boolean;
};

type Props = {
  item: NotificationRowProps;
  markAsRead: (id: number) => void;
};

const NotificationRow = ({ item, markAsRead }: Props) => {
  return (
    <Box
      display={'flex'}
      justifyContent="space-between"
      alignItems={'center'}
      sx={(theme) => ({
        padding: 2,
        backgroundColor: theme.palette.action.hover,
        borderRadius: 1,
      })}
    >
      <Box display="flex" flexDirection="column">
        <Typography>{item.message}</Typography>
        <Typography variant="caption">
          {item.dateTime.toString().split('T')[0]}
        </Typography>
      </Box>
      <Tooltip title={<Trans>Mark as read</Trans>} placement="right">
        <IconButton onClick={() => markAsRead(item.notificationID)}>
          <CheckOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
