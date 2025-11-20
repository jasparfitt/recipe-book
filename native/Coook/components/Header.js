import React, { useContext } from 'react';
import { Link, useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import LinkButton from './LinkButton';
import useStyle from '../hooks/useStyles';
import IconButton from './IconButton';
import RecipeContext from '../context/RecipeContext';

const Header = ({navigation}) => {
  const {navbar, container, mb3, flexRow, logoText, myAuto, headerButton, py1, msAuto, ms2, me2, flexFill, errorMessage, errorBorder} = useStyle();
  const {colors} = useTheme();
  const [_1,_2, error, setError] = useContext(RecipeContext);

  return (<>
    <View style={{...navbar, ...mb3}}>
      <View style={{...container, ...flexRow}}>
        <Link style={{...flexRow, ...myAuto, ...me2}} to={{screen: 'Home'}}>
          <View style={flexRow}>
            <Icon name="restaurant" size={30} color={colors.buttonText} />
            <Text style={logoText}>Coook</Text>
          </View>
        </Link>
        <View style={{...flexRow, ...flexFill}}>
          <LinkButton style={headerButton} outerStyle={{...myAuto, ...ms2}} variant="Primary" to={{screen: 'Home'}}>Home</LinkButton>
          <LinkButton style={headerButton} outerStyle={{...myAuto, ...ms2}} variant="Primary" to={{screen: 'Tags'}}>Tags</LinkButton>
          <IconButton 
            style={{...headerButton, ...py1}} 
            outerStyle={{...myAuto, ...msAuto}} 
            variant="Primary" 
            onPress={navigation.openDrawer} 
            iconName="menu"
            iconStyle={{marginVertical: -1}}
            iconSize={30}/>
        </View>
      </View>
    </View>
    {error ? <View style={{...flexRow, ...errorBorder}}><Text style={errorMessage}>{`${error}`}</Text><IconButton outerStyle={msAuto} variant="OutlineSecondary" iconName="close" iconSize={30} onPress={() => setError('')}/></View> : null}
  </>);
};

export default Header;