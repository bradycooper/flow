export const eliminateEndingString = (s: string): string => {
  const lastIndex = s.lastIndexOf(",");
  return typeof lastIndex === "string" ? s.slice(0, lastIndex) : s;
};
