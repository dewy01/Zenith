import { Trans } from '@lingui/macro';
import { Box, Paper, Typography } from '@mui/material';
import { NoteDashboard } from '~/api/Dashboard/api';
import { getNotesDashboard } from '~/api/Dashboard/query';
import { LoadingView } from '~/View/LoadingView/LoadingView';

export const NoteSection = () => {
  const { data, isLoading } = getNotesDashboard();

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
        <Trans>Last notes</Trans>
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        alignItems="center"
        gap={1.5}
      >
        {data.map((note) => (
          <NoteDescription key={note.noteID} note={note} />
        ))}
      </Box>
    </Paper>
  );
};

type Props = {
  note: NoteDashboard;
};

export const NoteDescription = ({ note }: Props) => {
  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette.action.hover,
        width: '100%',
        minWidth: '300px',
        padding: 1.5,
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
          {note.title}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          paddingLeft: 0.5,
          wordBreak: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {note.shortDescription}
      </Typography>
    </Paper>
  );
};
