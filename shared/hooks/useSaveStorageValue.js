import { useCallback, useContext } from "react";
import StorageContext from "../context/StorageContext";

const useSaveStorageValue = (key) => {
  const { setItem } = useContext(StorageContext);

  const saveStorageValue = useCallback((value, encode = true) => {
    return setItem(key, value, encode);
  }, []);

  return [saveStorageValue];
}

export default useSaveStorageValue;