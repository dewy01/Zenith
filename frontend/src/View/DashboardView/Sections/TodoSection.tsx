import { Trans } from '@lingui/macro';
import { Box, Paper, Typography } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import { getTodoDashboard } from '~/api/Dashboard/query';
import { LoadingView } from '~/View/LoadingView/LoadingView';

export const TodoSection = () => {
  const { data, isLoading } = getTodoDashboard();

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
        <Trans>Todo projects</Trans>
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        alignItems="center"
      >
        <Gauge
          value={data.completionPercentage}
          height={150}
          width={150}
          text={`${data.completionPercentage} %`}
        />
        <Typography color="text.secondary" variant="caption">
          {data.totalTodos} <Trans>Total toods</Trans>
        </Typography>
      </Box>
    </Paper>
  );
};
