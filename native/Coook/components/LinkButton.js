import { useLinkProps } from '@react-navigation/native';
import Button from './Button';

const LinkButton = ({to, children, ...props}) => {
  const { onPress, ...linkProps } = useLinkProps({ to });

  return (
    <Button onPress={onPress} {...linkProps} {...props}>
      {children}
    </Button>
  );
}

export default LinkButton;