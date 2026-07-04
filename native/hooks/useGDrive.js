import useGoogleSignIn from "./useGoogleSignIn";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";
import { useCallback } from "react";

const useGDrive = () => {
  const [googleSignIn] = useGoogleSignIn();

  const getDrive = useCallback(async () => {
    const isLoggedIn = GoogleSignin.getCurrentUser();

    if (!isLoggedIn) {
      await googleSignIn();
    }
  
    const newGDrive = new GDrive();
    newGDrive.accessToken = (await GoogleSignin.getTokens()).accessToken
    return newGDrive;
  }, []);

  return [getDrive];
}

export default useGDrive;