import { useEffect, useMemo, useState, useCallback } from "react";
import useSaveStorageValue from "../hooks/useSaveStorageValue";
import useStorageValue from "../hooks/useStorageValue";

const useStorageContextValue = (
  key,
  initialValue = null
) => {
  const { data, loading } = useStorageValue(key);
  const [saveData] = useSaveStorageValue(key);
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    if (!loading) {
      setValue(data);
    }
  }, [data, loading]);

  const setCurrentValue = useCallback(async (newValue) => {
    setValue(newValue);
    saveData(newValue);
  }, [saveData]);

  const contextValue = useMemo(() => {
    return [value, setCurrentValue]
  }, [value, setCurrentValue]);

  return { loading, contextValue }
};

export default useStorageContextValue;