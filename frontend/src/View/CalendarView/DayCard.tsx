import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DialogCreate } from './DialogCreate';

type Props = {
  day: dayjs.Dayjs;
  row: number;
};

export const DayCard = ({ day, row }: Props) => {
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
          // minHeight: '100px',
          // minWidth: '100px',
          aspectRatio: '1/1',
          padding: 1,
          border: '1px solid',
          borderColor: theme.palette.action.hover,
          gap: 1,
        })}
      >
        <Paper>
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
          onClick={handleClickOpen}
          sx={{
            cursor: 'pointer',
            flex: 1,
            minHeight: '80%',
          }}
        ></Box>
      </Box>
      <DialogCreate open={open} setOpen={setOpen} day={day} key={day.date()} />
    </>
  );
};
