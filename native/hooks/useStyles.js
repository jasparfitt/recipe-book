import regular from '../styles/regular';
import { useTheme } from '@react-navigation/native';
import { useCallback } from 'react';

const useStyles = () => {
  const theme = useTheme();

  return regular(theme.colors)
}

export default useStyles;