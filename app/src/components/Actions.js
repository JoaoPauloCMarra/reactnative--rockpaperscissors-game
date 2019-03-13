import React from 'react';
import { Dimensions, View, Image } from 'react-native';

import Images from '../assets/Images';
import Touchable from './Touchable';

const playerActions = ['rock', 'paper', 'scissors'];
const viewWidth = Dimensions.get('window').width;
const actionSpacer = 5;
const imageSize = viewWidth / playerActions.length - actionSpacer * 2 * playerActions.length;

type Props = {
  onChoiceMade: Event,
};
const Actions = ({ onChoiceMade }): Props => (
  <View style={styles.container}>
    {playerActions.map(action => (
      <View key={`action-${action}`} style={styles.action}>
        <Touchable onPress={() => onChoiceMade(action)}>
          <Image style={styles.image} source={Images[action]} />
        </Touchable>
      </View>
    ))}
  </View>
);

const styles = {
  container: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginHorizontal: actionSpacer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: imageSize,
    width: imageSize,
    resizeMode: 'cover',
  },
};

export default Actions;
