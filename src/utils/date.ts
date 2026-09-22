// Utility function to format date without timezone issues
export const formatDateWithoutTimezone = (dateStr: string, locale: string, options?: Intl.DateTimeFormatOptions): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(locale, options);
};
