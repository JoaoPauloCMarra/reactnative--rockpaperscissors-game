import React from 'react';
import { View } from 'react-native';

type Props = {
  height: Number,
};
const Spacer = ({ height }): Props => {
  const cmpStyle = { ...styles.container, height: height || 10 };
  return <View style={cmpStyle} />;
};

const styles = {
  container: {
    flexGrow: 0,
  },
};

export default Spacer;
