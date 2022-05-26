const normalizeMonthOrDay = (monthOrDay: string | number) => `0${monthOrDay}`.slice(-2);

export const formatDate = (date: Date) => [
  date.getFullYear(),
  normalizeMonthOrDay(date.getMonth() + 1),
  normalizeMonthOrDay(date.getDate()),
].join('-');

export const formatTime = (date: Date, seconds = false) => {
  const partials = [
    normalizeMonthOrDay(date.getHours()),
    normalizeMonthOrDay(date.getMinutes()),
  ];
  if (seconds) {
    partials.push(normalizeMonthOrDay(date.getSeconds()));
  }
  return partials.join(':');
};

export const formatDateTime = (date: Date, seconds = false) => (
  `${formatDate(date)} ${formatTime(date, seconds)}`
);
