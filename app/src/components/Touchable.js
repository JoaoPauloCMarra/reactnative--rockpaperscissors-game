import React from 'react';
import { TouchableOpacity } from 'react-native';

type Props = {
  children: React.ReactNode,
  button?: Boolean,
  style?: Object,
};
const Touchable = ({ children, style = {}, button, ...props }): Props => {
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
    backgroundColor: '#333',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export default Touchable;
