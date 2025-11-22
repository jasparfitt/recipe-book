import 'react-native-gesture-handler';
import useGoogleInit from './hooks/useGoogleInit';
import ContextWrapper from './components/ContextWrapper';
import Main from './Main';
import PlatformContextWrapper from './context/PlatformContextWrapper';

const App = () => {
  useGoogleInit();

  return (
    <PlatformContextWrapper>
      <ContextWrapper>
        <Main />
      </ContextWrapper>
    </PlatformContextWrapper>
  );
}

export default App;


