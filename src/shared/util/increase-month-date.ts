const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};

const language = 'pt-br';

const increaseMonth = (quantity: number): string => {
  const date = new Date();

  if (!quantity) {
    return new Date().toLocaleDateString(language, options);
  }

  date.setMonth(date.getMonth() + quantity);
  return date.toLocaleDateString(language, options);
};

export { increaseMonth };
