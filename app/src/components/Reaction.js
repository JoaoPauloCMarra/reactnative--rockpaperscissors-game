import React from 'react';
import { Dimensions, View, Image } from 'react-native';

import Images from '../assets/Images';
import Text from './Text';
import Spacer from './Spacer';
import Touchable from './Touchable';

const viewWidth = Dimensions.get('window').width;
const actionSpacer = 10;
const imageSize = viewWidth / 2 - actionSpacer * 2 * 2;

type Props = {
  text: String,
  playerChoice: String,
  cpuChoice: String,
  onReplay: Event,
};
const Reaction = ({ text, playerChoice, cpuChoice, onReplay }): Props => (
  <View style={styles.container}>
    <View style={styles.result}>
      <View style={styles.choice}>
        <Image style={styles.image} source={Images[playerChoice]} />
      </View>
      <Text size={28} bold>
        X
      </Text>
      <View style={styles.choice}>
        <Image style={styles.image} source={Images[cpuChoice]} />
      </View>
    </View>
    <Spacer height={40} />
    <Text size={28} bold>
      {text}
    </Text>
    <Spacer height={20} />
    <Touchable button onPress={onReplay}>
      <Text color="#000">play again</Text>
    </Touchable>
  </View>
);

const styles = {
  container: {
    flexGrow: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    flexGrow: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choice: {
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

export default Reaction;
