export const countChar = (s: string) => {
  const rs: Record<string, number> = {};
  for (const c of s) {
    const pre = rs[c] || 0;
    rs[c] = pre + 1;
  }
  return rs;
};

export const random = (min = 0, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
