import React from 'react';
import { Platform, SafeAreaView } from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
const paddingTop = majorVersionIOS < 11 ? 35 : 15;

type Props = {
  centered: Boolean,
};
const Container = ({ children, style, centered }): Props => {
  const cmpStyle = [styles.container, style];
  if (centered) cmpStyle.push({ justifyContent: 'center' });
  return <SafeAreaView style={cmpStyle}>{children}</SafeAreaView>;
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: paddingTop,
    paddingHorizontal: 0,
  },
};

export default Container;
