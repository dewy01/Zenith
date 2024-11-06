import dayjs from 'dayjs';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

interface CalendarContextProps {
  monthAsNumber: number;
  setMonthAsNumber: Dispatch<number>;
  weekAsNumber: number;
  setWeekAsNumber: Dispatch<number>;
  colors: { [color: string]: string };
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);

type Props = { colors: { [color: string]: string }; children: ReactNode };

export const CalendarProvider = ({ colors, children }: Props) => {
  const [monthAsNumber, setMonthAsNumber] = useState(dayjs().month());
  const [weekAsNumber, setWeekAsNumber] = useState(
    //TODO: validate if +1 always returns valid week or temporary fix
    dayjs().diff(dayjs().startOf('month'), 'week') + 1,
  );

  return (
    <CalendarContext.Provider
      value={{
        monthAsNumber,
        setMonthAsNumber,
        weekAsNumber,
        setWeekAsNumber,
        colors,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within its Provider');
  }
  return context;
};
