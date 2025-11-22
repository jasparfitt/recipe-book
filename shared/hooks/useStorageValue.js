import { useContext, useEffect } from 'react'
import useHook from './useHook';
import StorageContext from '../context/StorageContext';

const useStorageValue = (key, decode = true) => {
  const [asyncFunc, state] = useHook(true);
  const { getItem } = useContext(StorageContext);

  useEffect(() => {
    const getData = async () => {
      return await getItem(key, decode);
    };

    asyncFunc(getData);
  }, [key]);
  
  return state;
}

export default useStorageValue;