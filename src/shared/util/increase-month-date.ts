/**
 *
 * @param startDate The date you want to increase month (2022-01-15).
 * @param quantity The number of months.
 * @returns The new date.
 * @example increaseMonth('2022-01-15', 4): '2022-05-15'
 */
const increaseMonth = (startDate: string, quantity: number): string => {
  const date = new Date(startDate); // TODO: revisar datas com dias a mais

  if (quantity) {
    date.setMonth(date.getMonth() + quantity);
  }

  return date.toISOString().split('T')[0];
};

export { increaseMonth };
