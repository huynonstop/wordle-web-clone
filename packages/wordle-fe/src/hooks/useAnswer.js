import { useEffect, useState } from 'react';
import { WORDLE_API } from '../config';

const useAnswer = () => {
  const [answer, setAnswer] = useState(null);
  const fetchWord = async () => {
    const res = await fetch(WORDLE_API + 'word');
    const data = await res.json();
    setAnswer(data.word);
  };
  useEffect(() => {
    fetchWord();
  }, []);
  return [answer, fetchWord];
};

export default useAnswer;
