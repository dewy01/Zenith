import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useCalendar } from '~/context/CalendarContext';

const months: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthsSection = () => {
  const { monthAsNumber } = useCalendar();
  const setYear = dayjs(new Date(dayjs().year(), monthAsNumber)).format('YYYY');
  const normalizedMonthAsNumber =
    monthAsNumber < 0 ? 12 + (monthAsNumber % 12) : monthAsNumber % 12;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h6">{setYear}</Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {months.map((month, index) => (
          <Box sx={{ width: '50px', height: '50px' }}>
            <Box
              sx={(theme) => ({
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor:
                  index === normalizedMonthAsNumber
                    ? theme.palette.primary.main
                    : '',
              })}
            >
              <Typography
                variant="subtitle2"
                sx={(theme) => ({
                  color:
                    index === normalizedMonthAsNumber
                      ? theme.palette.getContrastText(
                          theme.palette.primary.main,
                        )
                      : '',
                })}
              >
                {month}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
