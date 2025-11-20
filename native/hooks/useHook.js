import { useState, useCallback} from 'react';

const useHook = (initialLoading) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!!initialLoading);

  const asyncFunc = useCallback(async (callback) => {
    try {
      setLoading(true);
      const value = await callback()
      setData(value);

      return value;
    } catch (error) {
      setError(error);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return [asyncFunc, { data, loading, error }];
}

export default useHook;