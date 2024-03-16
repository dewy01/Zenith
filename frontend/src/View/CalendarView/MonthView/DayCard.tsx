import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DialogCreate } from '../DialogCreate';
import { CalendarEvent } from '~/api/Calendar/api';
import { EventChip } from './EventChip';
//import { useCalendar } from '~/context/CalendarContext';

type Props = {
  day: dayjs.Dayjs;
  row: number;
  events?: CalendarEvent[];
};

export const DayCard = ({ day, row, events }: Props) => {
  const [open, setOpen] = useState(false);
  //const { monthAsNumber } = useCalendar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const isToday = dayjs().format('DD MM YYYY') === day.format('DD MM YYYY');

  // TODO: Consider using, cause backgrond flashing
  // const isThisMonth =
  //   day.format('MM') === dayjs().month(monthAsNumber).format('MM');

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: '15vh',
          minWidth: '100px',
          padding: 1,
          border: '1px solid',
          borderColor: theme.palette.action.hover,
          // backgroundColor: !isThisMonth
          //   ? alpha(
          //       theme.palette.grey[900],
          //       theme.palette.action.disabledOpacity,
          //     )
          //   : '',
          gap: 1,
        })}
      >
        <Paper onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {row === 0 && (
              <Typography variant="caption">
                {day.format('ddd').toUpperCase()}
              </Typography>
            )}
            <Box
              sx={(theme) => ({
                backgroundColor: isToday ? theme.palette.primary.main : '',
                borderRadius: '50%',
                width: '22px',
                height: '22px',
                textAlign: 'center',
              })}
            >
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  color: isToday
                    ? theme.palette.getContrastText(theme.palette.primary.main)
                    : '',
                })}
              >
                {day.format('DD')}
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: '80%',
            gap: 0.5,
          }}
        >
          {events?.map((item) => <EventChip event={item} key={item.eventID} />)}
        </Box>
      </Box>
      <DialogCreate open={open} setOpen={setOpen} day={day} key={day.date()} />
    </>
  );
};
