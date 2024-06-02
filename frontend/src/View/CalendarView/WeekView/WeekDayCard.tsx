import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DialogCreate } from '../DialogCreate';
import { CalendarEvent } from '~/api/Calendar/api';
import { WeekEventChip } from './WeekEventChip';

type Props = {
  day: dayjs.Dayjs;
  events?: CalendarEvent[];
};

export const WeekDayCard = ({ day, events }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const isToday = dayjs().format('DD MM YYYY') === day.format('DD MM YYYY');

  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: '100px',
          border: '1px solid',
          borderColor: theme.palette.action.hover,
          gap: 1,
        })}
      >
        <Paper
          onClick={handleClickOpen}
          sx={{ cursor: 'pointer', borderRadius: 0 }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption">
              {day.format('ddd').toUpperCase()}
            </Typography>
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
            paddingX: 1,
          }}
        >
          {events?.map((item) => (
            <WeekEventChip event={item} key={item.eventID} />
          ))}
        </Box>
      </Box>
      <DialogCreate open={open} setOpen={setOpen} day={day} key={day.date()} />
    </>
  );
};
