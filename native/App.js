import 'react-native-gesture-handler';
//import { polyfillGlobal } from "react-native/Libraries/Utilities/PolyfillFunctions"

import useGoogleInit from './hooks/useGoogleInit';
import ContextWrapper from './context/ContextWrapper';
import Main from './Main';
import PlatformContextWrapper from './context/PlatformContextWrapper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// required for uuid package to work
import 'react-native-get-random-values';

const App = () => {
  useGoogleInit();

  return (
    <PlatformContextWrapper>
      <ContextWrapper>
        <SafeAreaProvider>
          <Main />
        </SafeAreaProvider>
      </ContextWrapper>
    </PlatformContextWrapper>
  );
}

export default App;


