import { useCallback } from "react";

const useOrderByKey = (key) => useCallback((a, b) => {
  if (a[key] === b[key]) {
    return 0;
  } else if (a[key] < b[key]) {
    return -1;
  } else {
    return 1;
  }
}, []);

export default useOrderByKey;