import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import dayjs from 'dayjs';

interface CalendarContextProps {
  monthAsNumber: number;
  setMonthAsNumber: Dispatch<number>;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined,
);

type Props = { children: ReactNode };

export const CalendarProvider = ({ children }: Props) => {
  const [monthAsNumber, setMonthAsNumber] = useState(dayjs().month());

  return (
    <CalendarContext.Provider value={{ monthAsNumber, setMonthAsNumber }}>
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
