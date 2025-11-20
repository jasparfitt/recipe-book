import { useTheme } from "@react-navigation/native";
import useStyles from "../hooks/useStyles"
import {Switch as NativeSwitch} from 'react-native';

const Switch = ({style, ...props}) => {
  const {switchStyle} = useStyles();
  const {colors} = useTheme();

  return (
    <NativeSwitch
      style={{...switchStyle, style}}
      trackColor={{false: colors.switchTrack, true: colors.primary}}
      thumbColor={colors.switchThumb}
      {...props}
    />
  )
}

export default Switch;