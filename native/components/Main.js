import { Text, StatusBar } from 'react-native';
import Header from './Header';
import Menu from './Menu';
import StartPage from '../pages/StartPage';
import HomePage from '../pages/HomePage';
import NewRecipePage from '../pages/NewRecipePage';
import RecipePage from '../pages/RecipePage';
import EditRecipePage from '../pages/EditRecipePage';
import { useCallback, useContext } from 'react';
import ExportRecipePage from '../pages/ExportRecipePage';
import ImportRecipePage from '../pages/ImportRecipePage';
import DarkModeContext from '../context/DarkModeContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GoogleEnabledContext from '../context/GoogleEnabledContext';
import { NavigationContainer } from '@react-navigation/native';
import TagsPage from '../pages/TagsPage';
import TagPage from '../pages/TagPage';

const CommonColours = {
  primary: '#3EB489',
  primaryActive: '#65C3A1',
  secondary: '#C4675B',
  secondaryActive: '#D0857C',
  buttonText: '#000000',
  switchTrack: '#555555',
  switchThumb: '#CCCCCC',
}

const DefaultTheme = {
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
    <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
      <StatusBar backgroundColor='#3EB489'/>
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
        <Drawer.Screen name="Tags" options={{unmountOnBlur: true}} component={TagsPage}/>
        <Drawer.Screen name="Tag" options={{unmountOnBlur: true}} component={TagPage}/>
        <Drawer.Screen name="NewRecipe" options={{unmountOnBlur: true}} component={NewRecipePage}/>
        <Drawer.Screen name="Recipe" options={{unmountOnBlur: true}} component={RecipePage}/>
        <Drawer.Screen name="EditRecipe" options={{unmountOnBlur: true}} component={EditRecipePage}/>
        <Drawer.Screen name="Export" component={ExportRecipePage}/>
        <Drawer.Screen name="Import" component={ImportRecipePage}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Main;