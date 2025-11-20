import { useEffect, useState } from 'react'
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import useHook from './useHook';

const useStorageValue = (key, decode = true) => {
  const [asyncFunc, state] = useHook(true);
  const { getItem } = useAsyncStorage(key);
  const [valuePromise, setValuePromise] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await getItem();

      return decode ? JSON.parse(result) : result;
    };

    setValuePromise(asyncFunc(getData));
  }, []);
  
  return { ...state, promise: valuePromise };
}

export default useStorageValue;