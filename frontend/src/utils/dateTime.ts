

export const formatDate = (inputDate: string | number | Date) => {
    const date = new Date(inputDate);
    const dateFormat = new Intl.DateTimeFormat('pl-PL', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'UTC',
    });
  
    return dateFormat.format(date);
  };