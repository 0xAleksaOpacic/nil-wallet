// Generate a random salt between 1 and 10000
export const generateRandomSalt = (): bigint => {
  return BigInt(Math.floor(Math.random() * 10000) + 1);
};