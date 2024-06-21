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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { colorSchema, ColorModel } from './schema';
import { LabelSection } from './LabelSection';

enum ViewMode {
  month,
  week,
}

const defaultValues: ColorModel = {
  colors: {
    Purple: true,
    Red: true,
    Green: true,
    Blue: true,
    Yellow: true,
  },
};

export const CalendarView = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.month);
  const { monthAsNumber, setMonthAsNumber, setWeekAsNumber, weekAsNumber } =
    useCalendar();

  const { control } = useForm({
    resolver: zodResolver(colorSchema),
    defaultValues,
  });

  const handleReset = () => {
    setMonthAsNumber(dayjs().month());
    //TODO: validate if +1 always returns valid week or temporary fix
    setWeekAsNumber(dayjs().diff(dayjs().startOf('month'), 'week') + 1);
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
        //TODO: validate if +1 always returns valid week or temporary fix
        weekAsNumber === dayjs().diff(dayjs().startOf('month'), 'week') + 1
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
          sx={{ overflow: 'auto' }}
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
          <LabelSection control={control} />
        </Box>
      </SubDrawer>

      {viewMode === ViewMode.month ? (
        <CalendarPreview control={control} />
      ) : (
        <WeekPreview control={control} />
      )}

      <DialogCreate open={open} setOpen={setOpen} day={dayjs()} />
    </Main>
  );
};
