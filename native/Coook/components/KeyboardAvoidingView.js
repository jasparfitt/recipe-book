import { View, Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

const KeyboardAvoidingView = ({children}) => {
  const [padding, setPadding] = useState(0)

  // useEffect(() => {
  //   const showSub = Keyboard.addListener('keyboardDidShow', () => {
  //     setPadding(332);
  //   });

  //   const hideSub = Keyboard.addListener('keyboardDidHide', () => {
  //     setPadding(0);
  //   });

  //   return () => {
  //     showSub.remove();
  //     hideSub.remove();
  //   }
  // }, []);

  return (
    <View
      behavior="padding"
      style={{display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: padding}}>
        {children}
    </View>
  )
}

export default KeyboardAvoidingView;