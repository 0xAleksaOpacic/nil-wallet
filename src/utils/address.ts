

// Truncates a blockchain address to a short, readable format
export const truncateAddress = (address: string): string => {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}.....${address.slice(-6)}`;
};
