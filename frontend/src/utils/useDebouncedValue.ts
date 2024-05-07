import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

type Props = {
  value: any;
  delay: number;
};
export const useDebouncedValue = ({ value, delay }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};
