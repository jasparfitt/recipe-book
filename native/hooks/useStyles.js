import regular from '../styles/regular';
import { useTheme } from '@react-navigation/native';

const useStyles = () => {
  const theme = useTheme();

  return regular(theme.colors)
}

export default useStyles;