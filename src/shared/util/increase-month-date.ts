const increaseMonth = (quantity: number): string => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  if (quantity) {
    date.setMonth(date.getMonth() + quantity);
  }

  return date.toISOString().split('T')[0];
};

export { increaseMonth };
