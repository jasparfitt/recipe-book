import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useCallback } from "react";

const useGoogleSignIn = () => {
  const googleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.signInSilently();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        await GoogleSignin.signIn();
      } else {
        throw error;
      }
    }
    
    return true;
  }, []);

  return [googleSignIn];
}

export default useGoogleSignIn;