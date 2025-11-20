import { Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native'
import { transform } from "css-calc-transform";
import useStyles from '../hooks/useStyles';

const HeadingText = ({level, children, style}) => {
  const [headerStyle, setHeaderStyle] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    const newStyle = {...styles[level]};
    newStyle.fontSize = transform({
      prop: "fontSize",
      value: styles[level]?.fontSize,
      win: Dimensions.get('window')
    });
    setHeaderStyle(newStyle);
  }, [level, Dimensions])

  return (<Text style={{...styles.text, ...headerStyle, ...style}}>{children}</Text>);
}

export default HeadingText;