const transformUpperCaseTheFirstLetter = (target: string): string => {
  return target.replace(/^[a-z]{1}/g, target[0].toUpperCase());
};

export { transformUpperCaseTheFirstLetter };
