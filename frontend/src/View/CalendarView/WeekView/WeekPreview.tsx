import { Box, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useCalendar } from '~/context/CalendarContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
import { getEventBetween } from '~/api/Calendar/query';
import { useEffect, useState } from 'react';
import { useCurrentWeek } from '~/utils/useCurrentWeek';
import { WeekDayCard } from './WeekDayCard';
import { Control, useWatch } from 'react-hook-form';
import { colorSchema } from '../schema';
import { z } from 'zod';

const useStyles = makeStyles(() => ({
  root: {
    width: '50px',
    height: '50px',
  },
}));

interface Props {
  control: Control<z.infer<typeof colorSchema>>;
}

export const WeekPreview = ({ control }: Props) => {
  const { monthAsNumber, setMonthAsNumber, weekAsNumber, setWeekAsNumber } =
    useCalendar();
  const [week, setWeek] = useState(
    useCurrentWeek({ passedMonth: monthAsNumber, week: weekAsNumber }),
  );

  const selectedColors = useWatch({
    control,
    name: 'colors',
  });

  useEffect(() => {
    setWeek(useCurrentWeek({ passedMonth: monthAsNumber, week: weekAsNumber }));
  }, [monthAsNumber, weekAsNumber]);

  const { data: events } = getEventBetween({
    from: week[0].format('DD MM YYYY').toString(),
    to: week[6].format('DD MM YYYY').toString(),
    colors: JSON.stringify(selectedColors),
  });

  const classes = useStyles();

  const handleNextMonth = () => {
    if (weekAsNumber < 4) {
      setWeekAsNumber(weekAsNumber + 1);
    } else {
      setWeekAsNumber(0);
      setMonthAsNumber(monthAsNumber + 1);
    }
  };

  const handlePrevMonth = () => {
    if (weekAsNumber > 1) {
      setWeekAsNumber(weekAsNumber - 1);
    } else {
      setWeekAsNumber(4);
      setMonthAsNumber(monthAsNumber - 1);
    }
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
        maxHeight: '92vh',
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
          flexDirection: 'row',
          maxWidth: '85vw',
          height: '90vh',
        }}
      >
        {week.map((day, dayIndex) => (
          <WeekDayCard
            day={day}
            key={dayIndex}
            events={events?.filter(
              (a) => dayjs(a.dateTime).format('DD MM') === day.format('DD MM'),
            )}
          />
        ))}
      </Box>
    </Box>
  );
};
