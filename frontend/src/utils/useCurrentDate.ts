import dayjs from 'dayjs';

export const useCurrentDate = (passedMonth: number) => {
  const month = passedMonth
  const year = dayjs().year();
  const firstDay = dayjs(new Date(year, month, 1)).day();

  let monthCount = 0 - firstDay;
  const days = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      monthCount++;
      return dayjs(new Date(year, month, monthCount));
    });
  });
  return days;
};
