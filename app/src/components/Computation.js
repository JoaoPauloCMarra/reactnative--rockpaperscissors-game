import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import { Dimensions, View, Image } from 'react-native';

import Images from '../assets/Images';

const actions = ['rock', 'paper', 'scissors'];
const viewWidth = Dimensions.get('window').width;
const imageSize = viewWidth / 2;

type Props = {
  action: String,
};
const Computation = ({ action }): Props => (
  <View style={styles.container}>
    <View style={styles.action}>
      <Image style={styles.image} source={Images[actions[action]]} />
    </View>
  </View>
);

const styles = {
  container: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: imageSize,
    width: imageSize,
    resizeMode: 'cover',
  },
};

export default compose(
  withState('action', 'setAction', 0),
  lifecycle({
    componentDidMount() {
      this.interval = setInterval(() => {
        const { action } = this.props;
        const nextAction = action < 2 ? action + 1 : 0;
        this.props.setAction(nextAction);
      }, 100);
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    },
  })
)(Computation);
