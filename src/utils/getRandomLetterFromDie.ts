export const getRandomLetterFromDie = (die: string[]) => {
  return die[Math.floor(Math.random() * die.length)];
};