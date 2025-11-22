import { useEffect, useState } from 'react';
import googleConfig from '../config/googleConfig';
import store from 'store2';

const useGoogleInit = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await gapiLoadPromise;
      await new Promise((resolve, reject) => gapi.load('client', { callback: resolve, onerror: reject }));
      await gapi.client.init({});
      await gapi.client.load(googleConfig.DISCOVERY_DOCS);
      const token = store.get('googleToken');

      if (token) {
        gapi.client.setToken(token);
      }

      setLoading(false);
    }

    init();
  }, []);

  return loading;
}

export default useGoogleInit;