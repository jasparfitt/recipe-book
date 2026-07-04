import { useLinkProps } from '@react-navigation/native';
import Button from './Button';

const LinkButton = ({ screen, children, ...props }) => {
  const { onPress, ...linkProps } = useLinkProps({ screen });

  return (
    <Button onPress={onPress} {...linkProps} {...props}>
      {children}
    </Button>
  );
}

export default LinkButton;