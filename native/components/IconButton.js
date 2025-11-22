import { Pressable, Text, View } from 'react-native';
import useStyles from '../hooks/useStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconButton = ({ onPress, style, variant, outerStyle, iconName, iconSize, iconStyle, ...props }) => {
  const styles = useStyles()

  const combinedStyle = (pressed) => ({
    ...styles.btn,
    ...styles[`btn${variant}`],
    ...(pressed ? styles[`btn${variant}Pressed`] : {}),
    ...(style)
  });

  const color = styles[`btn${variant}`].color;
  const pressedColor = styles[`btn${variant}Pressed`]?.color || color;

  return (
    <Pressable onPress={onPress} style={outerStyle} {...props}>
      {({pressed}) => (
        <View style={combinedStyle(pressed)}>
          <Icon name={iconName} size={iconSize} style={iconStyle} color={pressed ? pressedColor : color} />
        </View>
      )}
    </Pressable>
  );
}

export default IconButton;