import { useMemo } from 'react';
import store from 'store2';

const useStorage = () => {
  return useMemo(() => {
    const setItem = async (key, value, encode = true) => {
      return store.set(key, value);
    };

    const getItem = async (key, decode = true) => {
      return store.get(key);
    };

    return { setItem, getItem };
  }, []);
};

export default useStorage;