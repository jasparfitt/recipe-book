import 'react-native-gesture-handler';
import useGoogleInit from './hooks/useGoogleInit';
import ContextWrapper from './components/ContextWrapper';
import Main from './components/Main';

const App = () => {
  useGoogleInit();

  return (
    <ContextWrapper>
      <Main />
    </ContextWrapper>
  );
}

export default App;


