import { View } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import useStyles from '../hooks/useStyles';
import TextInput from './TextInput';

const SearchBar = ({ setSearchTerm, style }) => {
  const {
    flexRow, flexFill, text, groupEnd, dFlex, myAuto, p1, textInputBorder
  } = useStyles();

  const onSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <View style={{...flexRow, ...textInputBorder, ...style, }}>
      <View style={{ ...dFlex }}>
        <MaterialIcons name="search" size={30} color={text.color} style={{ ...myAuto, ...p1 }}/>
      </View>
      <TextInput style={{ ...flexFill, ...groupEnd, borderWidth: 0, borderLeftWidth: 1 }} placeholder='Search' onChangeText={onSearchChange}/>
    </View>
  );
};

export default SearchBar;