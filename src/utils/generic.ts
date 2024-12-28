export const generateRandomNumber = (max: number = 100000) => {
  return Math.floor(Math.random() * max) + 1;
};
