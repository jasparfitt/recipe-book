import { GoogleSignin, isNoSavedCredentialFoundResponse, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin";
import { useCallback } from "react";

const useGoogleSignIn = () => {
  const googleSignIn = useCallback(async () => {
    try {
      let resp = await GoogleSignin.signInSilently();

      if (isNoSavedCredentialFoundResponse(resp)) {
        resp = await GoogleSignin.signIn();
      }

      if (!isSuccessResponse(resp)) {
        throw new Error(JSON.stringify(resp));
      }
      
      return true;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return [googleSignIn];
}

export default useGoogleSignIn;