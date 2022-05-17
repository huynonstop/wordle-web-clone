import {Ruler} from '@/ruler';
import words from '~/words.json';

describe('Wordle Rule', () => {
  const wordsSet = new Set(words);
  test('Word valid', () => {
    expect(Ruler.checkValidWord(wordsSet, 'hello')).toBeTruthy();
  });

  test('Word invalid', () => {
    expect(Ruler.checkValidWord(wordsSet, 'abcde')).toBeFalsy();
  });

  test('Word matched', () => {
    const diffInfo = Ruler.wordDiff('abcde', 'abcde');
    expect(diffInfo).toEqual([[
      {char: 'a', color: 1},
      {char: 'b', color: 1},
      {char: 'c', color: 1},
      {char: 'd', color: 1},
      {char: 'e', color: 1},
    ], true]);
  });

  test('Word mixed', () => {
    const diffInfo = Ruler.wordDiff('abcde', 'edaab');
    expect(diffInfo).toEqual([[
      {char: 'e', color: 2},
      {char: 'd', color: 2},
      {char: 'a', color: 2},
      {char: 'a', color: 0},
      {char: 'b', color: 2},
    ], false]);
  });
});
