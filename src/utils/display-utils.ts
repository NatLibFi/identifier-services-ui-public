// Used in tables to trim values that are too long
// Note that maxLength will include '..' so trimmed string will be sliced 2 characters shorter
export const trimString = (maxLength: number) => {
  return (value: string) => `${value.slice(0, maxLength - 1)}..`;
};
