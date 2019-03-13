import React from 'react';
import { Text } from 'react-native';

import { moderateScale } from '../helpers/fontScale';

type Props = {
  children: React.ReactNode,
  style?: Object,
  title?: Boolean,
  bold?: Boolean,
};
const Container = ({ children, style = {}, size, color, title, bold }): Props => {
  const cmpStyle = [styles.text, style];
  if (title) cmpStyle.push(styles.title);
  if (bold) cmpStyle.push(styles.bold);
  if (size && size > 14) cmpStyle.push({ fontSize: size });
  if (color) cmpStyle.push({ color: color });

  return <Text style={cmpStyle}>{children}</Text>;
};

const styles = {
  text: {
    color: '#fff',
    fontSize: moderateScale(14),
  },
  title: {
    fontSize: moderateScale(22),
  },
  bold: {
    fontWeight: 'bold',
  },
};

export default Container;
