export const WORDLE_API =
  import.meta.env.VITE_WORDLE_API ||
  import.meta.env.PROD.VITE_WORDLE_API ||
  process.env.VITE_WORDLE_API;

export const GUESS_COUNT = 6;
export const LETTER_LIST = [
  { key: 'a' },
  { key: 'b' },
  { key: 'c' },
  { key: 'd' },
  { key: 'e' },
  { key: 'f' },
  { key: 'g' },
  { key: 'h' },
  { key: 'i' },
  { key: 'j' },
  { key: 'k' },
  { key: 'l' },
  { key: 'm' },
  { key: 'n' },
  { key: 'o' },
  { key: 'p' },
  { key: 'q' },
  { key: 'r' },
  { key: 's' },
  { key: 't' },
  { key: 'u' },
  { key: 'v' },
  { key: 'w' },
  { key: 'x' },
  { key: 'y' },
  { key: 'z' },
];
