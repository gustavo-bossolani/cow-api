/**
 *
 * @param startDate The date you want to increase month (2022-01-15).
 * @param quantity The number of months.
 * @returns The new date.
 * @example increaseMonth('2022-01-15', 4): '2022-05-15'
 */
const increaseMonth = (startDate: string, quantity: number): string => {
  if (quantity > 1) {
    const [year, month, day] = startDate.split('-');

    const date = new Date(
      // Obs: é diminuido duas vezes a quantidade de meses por conta das seguintes regras:
      // 1 - A contagem de meses no js começa em 0. Ex: Jan = 0, Fev = 1,...
      // 2 - A primeira parcela é considerada no mês corrente
      Date.UTC(Number(year), Number(month) - 2 + quantity, Number(day)),
    );

    return date.toISOString().split('T')[0];
  }

  return startDate;
};

export { increaseMonth };
