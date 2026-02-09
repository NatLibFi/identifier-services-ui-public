// Expects month to be zero-padded number that starts indexing from 1
export const isInvalidPublishingMonth = (year: string, month: string) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Set indexing to be comparable to select field values

  const selectedMonthNumber = Number(month.replace(/^0/, ''));
  const isCurrentYear = year === String(currentYear);
  const isPriorMonth = selectedMonthNumber < currentMonth;
  const isInvalidPublishingDate = isCurrentYear && isPriorMonth;

  return isInvalidPublishingDate;
};
