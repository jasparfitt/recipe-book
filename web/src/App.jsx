import ContextWrapper from './context/ContextWrapper';
import PlatformContextWrapper from './context/PlatformContextWrapper';
import Main from './Main';
import useGoogleInit from './hooks/useGoogleInit';

function App() {
  const loading = useGoogleInit();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PlatformContextWrapper>
      <ContextWrapper>
        <Main />
      </ContextWrapper>
    </PlatformContextWrapper>
  );
}

export default App;
