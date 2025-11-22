import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

const useStorage = () => {
  return useMemo(() => {
    const setItem = async (key, value, encode = true) => {
      const encodedValue = encode && value ? JSON.stringify(value) : value;

      return AsyncStorage.setItem(key, encodedValue);
    };

    const getItem = async (key, decode = true) => {
      const value = await AsyncStorage.getItem(key);

      return decode && value ? JSON.parse(value) : value;
    };

    return { setItem, getItem };
  }, [setItem, getItem]);
};

export default useStorage;