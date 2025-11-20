import { Pressable, View } from 'react-native';
import HeadingText from './HeadingText';
import { useContext } from 'react';
import GoogleEnabledContext from '../context/GoogleEnabledContext';
import DarkModeContext from '../context/DarkModeContext';
import LinkButton from './LinkButton';
import useStyles from '../hooks/useStyles';
import ThemeText from './ThemeText';
import IconButton from './IconButton';
import { useTheme } from '@react-navigation/native';
import Switch from './Switch';

const Menu = ({ navigation }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [googleEnabled, setGoogleEnabled] = useContext(GoogleEnabledContext);
  const { mx3, mt2, flexRow, myAuto, msAuto, px1, py1, mb2, mb3, ms2, p1 } = useStyles();

  return (
    <View style={{...mx3, ...mt2}}>
      <View style={flexRow}>
        <HeadingText level="h5" style={myAuto}>Menu</HeadingText>
        <IconButton
          outerStyle={msAuto}
          style={{...px1, ...py1}} 
          variant="Link" 
          onPress={navigation.closeDrawer} 
          iconName="close" 
          iconSize={30}/>
      </View>
      <View style={{...flexRow, ...mb2}}>
        <Switch
          onValueChange={setDarkMode}
          value={darkMode}
        />
        <Pressable onPress={() => setDarkMode(!darkMode)}>
          <ThemeText style={{...ms2, ...myAuto, ...p1}}>Dark mode</ThemeText>
        </Pressable>
      </View>
      <View style={{...flexRow, ...mb3}}>
        <Switch
          onValueChange={setGoogleEnabled}
          value={googleEnabled}
        />
        <Pressable onPress={() => setGoogleEnabled(!googleEnabled)}>
          <ThemeText style={{...ms2, ...myAuto, ...p1}}>Google integration</ThemeText>
        </Pressable>
      </View>
      <LinkButton style={mb2} variant="Primary" to={{screen: 'Export'}}>Export recipes</LinkButton>
      <LinkButton style={mb3} variant="Primary" to={{screen: 'Import'}}>Import recipes</LinkButton>
    </View>
  )
};

export default Menu;