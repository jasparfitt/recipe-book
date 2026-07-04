import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

const useStorage = () => {
  return useMemo(() => {
    const setItem = async (key, value, encode = true) => {
      const isEmpty = value === null || value === undefined;
      const encodedValue = encode && !isEmpty ? JSON.stringify(value) : value;
      return AsyncStorage.setItem(key, encodedValue);
    };

    const getItem = async (key, decode = true) => {
      const value = await AsyncStorage.getItem(key);
      const isEmpty = value === null || value === undefined;   

      return decode && !isEmpty ? JSON.parse(value) : value;
    };

    return { setItem, getItem };
  }, []);
};

export default useStorage;