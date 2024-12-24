export const getEnv = (key: string): string | null => {
  if (!key) return null;

  const value = process.env[key];

  if (!value) {
    return null;
  }

  return value;
};

export const convertBitToKiloBit = (bit: any): number => {
  if (!bit || !['string', 'number'].includes(typeof bit)) {
    return 0;
  }

  if (typeof bit === 'string') {
    const parsedBit = parseInt(bit);

    if (isNaN(parsedBit)) {
      return 0;
    }

    return parsedBit / 1024;
  }

  return bit / 1024;
};
