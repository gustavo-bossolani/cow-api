const increaseMonth = (quantity: number, date: Date): string => {
  date.setMonth(date.getMonth() + quantity);

  return date.toLocaleDateString();
};

export { increaseMonth };
