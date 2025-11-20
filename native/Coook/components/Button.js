import { Pressable, Text, View } from 'react-native';
import useStyles from '../hooks/useStyles';

const Button = ({onPress, style, variant, children, outerStyle, ...props}) => {
  const styles = useStyles()

  const combinedStyle = (pressed) => ({
    ...styles.btn,
    ...styles[`btn${variant}`],
    ...(pressed ? styles[`btn${variant}Pressed`] : {}),
    ...(style)
  })

  return (
    <Pressable onPress={onPress} style={outerStyle} {...props}>
      {({pressed}) => (<Text style={combinedStyle(pressed)}>{children}</Text>)}
    </Pressable>
  );
}

export default Button;