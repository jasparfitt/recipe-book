import { StatusBar, View } from 'react-native';
import Header from './components/Header';
import Menu from './components/Menu';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import RecipePage from './pages/RecipePage';
import EditRecipePage from './pages/EditRecipePage';
import { useContext } from 'react';
import ExportPage from './pages/ExportPage';
import ImportPage from './pages/ImportPage';
import DarkModeContext from 'coook.shared/context/DarkModeContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GoogleEnabledContext from 'coook.shared/context/GoogleEnabledContext';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import TagsPage from './pages/TagsPage';
import TagPage from './pages/TagPage';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommonColours = {
  primary: '#3EB489',
  primaryActive: '#65C3A1',
  secondary: '#C4675B',
  secondaryActive: '#D0857C',
  buttonText: '#000000',
  switchTrack: '#555555',
  switchThumb: '#CCCCCC',
}

const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...CommonColours,
    inputBorder: '#CED4DA',
    outlinePrimary: '#2D6A4F',
    outlineSecondary: '#98372A',
    background: '#FFFCF2',
    card: '#FFFCF2',
    text: '#212529',
  },
};

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...CommonColours,
    inputBorder: '#74797d',
    outlinePrimary: '#73BF9C',
    outlineSecondary: '#C4675B',
    background: '#202124',
    card: '#202124',
    text: '#E8EAED',
  },
};

const Drawer = createDrawerNavigator();

const Main = () => {
  const [googleEnabled] = useContext(GoogleEnabledContext);
  const [darkMode] = useContext(DarkModeContext);

  return (
    <NavigationContainer theme={darkMode ? DarkTheme : LightTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#3EB489' }}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor='#3EB489' />
          <Drawer.Navigator
            initialRouteName={googleEnabled === null ? "Start" : 'Home'}
            drawerContent={(props) => <Menu {...props}/>}
            backBehavior="history"
            screenOptions={{
              drawerPosition:'right',
              header: (props) => <Header {...props}/>,
            }}>
            <Drawer.Screen name="Start" component={StartPage}/>
            <Drawer.Screen name="Home" component={HomePage}/>
            <Drawer.Screen name="Tags" options={{popToTopOnBlur: true}} component={TagsPage}/>
            <Drawer.Screen name="Tag" options={{popToTopOnBlur: true}} component={TagPage}/>
            <Drawer.Screen name="NewRecipe" options={{popToTopOnBlur: true}} component={NewRecipePage}/>
            <Drawer.Screen name="Recipe" options={{popToTopOnBlur: true}} component={RecipePage}/>
            <Drawer.Screen name="EditRecipe" options={{popToTopOnBlur: true}} component={EditRecipePage}/>
            <Drawer.Screen name="Export" component={ExportPage}/>
            <Drawer.Screen name="Import" component={ImportPage}/>
          </Drawer.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default Main;