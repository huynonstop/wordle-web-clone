import { useCallback, useEffect, useState } from 'react';
import { WORDLE_API } from '../config';

const useAnswer = () => {
  const [answer, setAnswer] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchWord = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(WORDLE_API + 'word');
      const data = await res.json();
      setAnswer(data.word);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchWord();
  }, [fetchWord]);
  return [{ answer, isLoading, error }, fetchWord];
};

export default useAnswer;
