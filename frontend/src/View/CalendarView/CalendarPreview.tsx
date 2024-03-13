import { Box, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DayCard } from './DayCard';
import { useCalendar } from '~/context/CalendarContext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
import { getEventBetween } from '~/api/Calendar/query';

const useStyles = makeStyles(() => ({
  root: {
    width: '50px',
    height: '50px',
  },
}));

type Props = {
  month: dayjs.Dayjs[][];
};

export const CalendarPreview = ({ month }: Props) => {
  const { data: events } = getEventBetween({
    from: month[0][0].format('DD MM YYYY').toString(),
    to: month[4][6].format('DD MM YYYY').toString(),
  });

  const { monthAsNumber, setMonthAsNumber } = useCalendar();
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
