import { Trans } from '@lingui/macro';
import { alpha, Box, Paper, Typography } from '@mui/material';
import { CalendarEventDashboard } from '~/api/Dashboard/api';
import { getEventsDashboard } from '~/api/Dashboard/query';
import { LoadingView } from '~/View/LoadingView/LoadingView';

export const EventSection = () => {
  const { data, isLoading } = getEventsDashboard();

  if (!data || isLoading) return <LoadingView />;

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingY: 2,
        paddingX: 4,
        gap: 1,
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">
        <Trans>Upcoming events</Trans>
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        alignItems="center"
        gap={1.5}
      >
        {data.map((event) => (
          <EventChip key={event.eventID} event={event} />
        ))}
      </Box>
    </Paper>
  );
};

type Props = {
  event: CalendarEventDashboard;
};

export const EventChip = ({ event }: Props) => {
  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: alpha(
          event.eventColor,
          theme.palette.action.disabledOpacity,
        ),
        width: '100%',
        maxWidth: '400px',
        borderLeft: '5px solid',
        borderColor: event.eventColor,
        padding: 0.5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      })}
    >
      <Box display={'flex'} gap={1} alignItems={'baseline'}>
        <Typography
          variant="body1"
          sx={{
            paddingLeft: 0.5,
            wordBreak: 'break-word',
          }}
        >
          {event.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(event.dateTime).toLocaleDateString()}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{
          paddingLeft: 0.5,
          wordBreak: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {event.description}
      </Typography>
    </Paper>
  );
};
