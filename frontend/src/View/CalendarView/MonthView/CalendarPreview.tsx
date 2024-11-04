import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { getEventBetween } from '~/api/Calendar/query';
import { useCalendar } from '~/context/CalendarContext';
import { useCurrentDate } from '~/utils/useCurrentDate';
import { colorSchema } from '../schema';
import { DayCard } from './DayCard';

const useStyles = makeStyles(() => ({
  root: {
    width: '50px',
    height: '50px',
  },
}));

interface Props {
  control: Control<z.infer<typeof colorSchema>>;
}

export const CalendarPreview = ({ control }: Props) => {
  const { monthAsNumber, setMonthAsNumber } = useCalendar();
  const [month, setMonth] = useState(useCurrentDate(monthAsNumber));

  const selectedColors = useWatch({
    control,
    name: 'colors',
  });

  useEffect(() => {
    setMonth(useCurrentDate(monthAsNumber));
  }, [monthAsNumber]);

  const { data: events } = getEventBetween({
    from: month[0][0].format('YYYY-MM-DD').toString(),
    to: month[4][6].format('YYYY-MM-DD').toString(),
    colors: JSON.stringify(selectedColors),
  });

  const classes = useStyles();

  const handleNextMonth = () => {
    setMonthAsNumber(monthAsNumber + 1);
  };

  const handlePrevMonth = () => {
    setMonthAsNumber(monthAsNumber - 1);
  };

  const currentMonth = dayjs(new Date(dayjs().year(), monthAsNumber)).format(
    'MMMM YYYY',
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '90vw',
        maxHeight: '80vh',
        gap: 2,
      }}
    >
      <Box display={'flex'} justifyContent={'center'} gap={2}>
        <IconButton className={classes.root} onClick={handlePrevMonth}>
          <ChevronLeftIcon className={classes.root} />
        </IconButton>
        <Typography
          fontWeight={'500'}
          fontSize={32}
          sx={{ minWidth: '20vw' }}
          textAlign={'center'}
        >
          {currentMonth}
        </Typography>
        <IconButton className={classes.root} onClick={handleNextMonth}>
          <ChevronRightIcon className={classes.root} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '85vw',
        }}
      >
        {month.map((week, index) => (
          <Box
            sx={{
              width: '100%',
              minHeight: '100px',
            }}
            key={index}
            display="flex"
            justifyContent="space-around"
          >
            {week.map((day, dayIndex) => (
              <DayCard
                day={day}
                row={index}
                key={dayIndex}
                events={events?.filter(
                  (a) =>
                    dayjs(a.dateTime).format('DD MM') === day.format('DD MM'),
                )}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
