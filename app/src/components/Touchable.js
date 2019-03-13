import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
  children: React.ReactNode,
  style?: Object,
  button?: Boolean,
};
const Touchable = ({ children, style, button, ...props }): Props => {
  const cmpStyle = [styles.container, style];
  if (button) cmpStyle.push(styles.button);
  return (
    <TouchableOpacity style={cmpStyle} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexGrow: 0,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export default Touchable;
