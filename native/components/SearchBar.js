import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useStyles from '../hooks/useStyles';
import TextInput from './TextInput';

const SearchBar = ({ setSearchTerm, style }) => {
  const {
    flexRow, flexFill, text, groupEnd, pyAuto, searchIcon, dFlex, myAuto, p1
  } = useStyles();

  const onSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <View style={{...flexRow, ...style}}>
      <View style={{...pyAuto, ...searchIcon, ...dFlex}}>
        <Icon name="search" size={30} color={text.color} style={{...myAuto, ...p1}}/>
      </View>
      <TextInput style={{...flexFill, ...groupEnd}} placeholder='Search' onChangeText={onSearchChange}/>
    </View>
  );
};

export default SearchBar;