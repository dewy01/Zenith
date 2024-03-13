import { Box, IconButton, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Main } from '~/component/Main';
import { SubDrawer } from '~/component/SubDrawer';
import { useCurrentDate } from '~/utils/useCurrentDate';
import { CalendarPreview } from './CalendarPreview';
import { useCalendar } from '~/context/CalendarContext';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { DialogCreate } from './DialogCreate';

export const CalendarView = () => {
  const [month, setMonth] = useState(useCurrentDate());
  const { monthAsNumber, setMonthAsNumber } = useCalendar();

  useEffect(() => {
    setMonth(useCurrentDate(monthAsNumber));
  }, [monthAsNumber]);

  const handleReset = () => {
    setMonthAsNumber(dayjs().month());
    enqueueSnackbar('Mont reset', {
      autoHideDuration: 1000,
    });
  };

  const isSameMonth = monthAsNumber === dayjs().month();

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
          gap={2}
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
            <Typography fontSize={24}>Caledar</Typography>
            <IconButton disabled={isSameMonth} onClick={handleReset}>
              <RestartAltIcon />
            </IconButton>
          </Box>
          <List
            sx={{
              maxHeight: '90vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <></>
          </List>
        </Box>
      </SubDrawer>

      <CalendarPreview month={month} />
      <DialogCreate open={open} setOpen={setOpen} day={dayjs()} />
    </Main>
  );
};
