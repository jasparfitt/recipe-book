import { useEffect } from 'react';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const useGoogleInit = () => {
  useEffect(() => {
    const init = async () => {
      await GoogleSignin.hasPlayServices();

      GoogleSignin.configure({
        webClientId: '673876172049-gckttaffnsbjhl7mq9lhuceirn0ftghj.apps.googleusercontent.com',
        scopes: ['https://www.googleapis.com/auth/drive.appdata','https://www.googleapis.com/auth/drive.file']
      });
    }
    init();
  },[]);
}

export default useGoogleInit;