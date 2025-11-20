import { useCallback } from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const useSaveStorageValue = (key) => {
  const { setItem } = useAsyncStorage(key);

  const saveStorageValue = useCallback((value, encode = true) => {
    return setItem(encode ? JSON.stringify(value) : value);
  }, []);

  return [saveStorageValue];
}

export default useSaveStorageValue;