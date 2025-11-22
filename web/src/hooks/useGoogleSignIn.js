
import { useCallback } from "react";
import googleConfig from "../config/googleConfig";
import store from "store2";

const useGoogleSignIn = () => {
  const googleSignIn = useCallback(async () => {
    let tokenClient;
    await gisLoadPromise;

    await new Promise((resolve, reject) => {
      try {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: googleConfig.CLIENT_ID,
          scope: googleConfig.SCOPES,
          prompt: '',
          callback: '',
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    await new Promise((resolve, reject) => {
      try {
        tokenClient.callback = (resp) => {
          if (resp.error !== undefined) {
            reject(resp);
          }

          store.set('googleToken', gapi.client.getToken());
          resolve(resp);
        };
        
        tokenClient.requestAccessToken();
      } catch (err) {
        reject(err);
      }
    });
  }, []);

  return [googleSignIn];
}

export default useGoogleSignIn;