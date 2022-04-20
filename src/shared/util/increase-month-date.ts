const increaseMonth = (quantity: number): string => {
  const date = new Date();
  date.setMonth(date.getMonth() + quantity);

  return date.toLocaleDateString();
};

export { increaseMonth };
