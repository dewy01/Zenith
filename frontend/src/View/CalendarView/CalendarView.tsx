import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Main } from '~/component/Main';
import { SubDrawer } from '~/component/SubDrawer';
import { CalendarPreview } from './MonthView/CalendarPreview';
import { useCalendar } from '~/context/CalendarContext';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { DialogCreate } from './DialogCreate';
import { WeekPreview } from './WeekView/WeekPreview';
import { MonthsSection } from './MonthsSection';
import { Trans } from '@lingui/macro';

enum ViewMode {
  month,
  week,
}

export const CalendarView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.month);
  const { monthAsNumber, setMonthAsNumber, setWeekAsNumber, weekAsNumber } =
    useCalendar();

  const handleReset = () => {
    setMonthAsNumber(dayjs().month());
    setWeekAsNumber(dayjs().diff(dayjs().startOf('month'), 'week'));
    enqueueSnackbar(<Trans>Month reset</Trans>, {
      autoHideDuration: 1000,
    });
  };

  const isSameMonth = useMemo(() => {
    if (viewMode === ViewMode.month) {
      return monthAsNumber === dayjs().month();
    } else {
      return (
        monthAsNumber === dayjs().month() &&
        weekAsNumber === dayjs().diff(dayjs().startOf('month'), 'week')
      );
    }
  }, [monthAsNumber, weekAsNumber, viewMode]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Main>
      <SubDrawer>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={5}
          sx={{ overflow: 'hidden' }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ maxHeight: '10vh' }}
          >
            <IconButton onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
            <Typography fontSize={24}>
              <Trans>Calendar</Trans>
            </Typography>
            <IconButton disabled={isSameMonth} onClick={handleReset}>
              <RestartAltIcon />
            </IconButton>
          </Box>
          <ToggleButtonGroup value={viewMode} exclusive>
            <ToggleButton
              sx={{ width: '50%' }}
              value={ViewMode.month}
              onClick={() => setViewMode(ViewMode.month)}
            >
              <Trans>Month</Trans>
            </ToggleButton>
            <ToggleButton
              sx={{ width: '50%' }}
              value={ViewMode.week}
              onClick={() => setViewMode(ViewMode.week)}
            >
              <Trans>Week</Trans>
            </ToggleButton>
          </ToggleButtonGroup>
          <MonthsSection />
        </Box>
      </SubDrawer>

      {viewMode === ViewMode.month ? <CalendarPreview /> : <WeekPreview />}

      <DialogCreate open={open} setOpen={setOpen} day={dayjs()} />
    </Main>
  );
};
