import React from 'react';
import { View } from 'react-native';

import Text from './Text';

type Props = {};
const Scoreboard = ({ scoreA, scoreB }): Props => {
  return (
    <View style={styles.container}>
      <Text bold size={16} style={styles.title}>
        Scoreboard
      </Text>
      <View style={styles.scores}>
        <View style={styles.text}>
          <Text>you</Text>
        </View>
        <View style={styles.counter}>
          <Text size={22} color="#fff" bold>
            {scoreA}
          </Text>
        </View>
        <View style={styles.text}>
          <Text bold>x</Text>
        </View>
        <View>
          <Text size={22} color="red">
            {scoreB}
          </Text>
        </View>
        <View style={styles.text}>
          <Text>cpu</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexGrow: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
  },
  scores: {
    flexGrow: 0,
    flexDirection: 'row',
  },
  title: {
    marginBottom: 10,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
};

export default Scoreboard;
