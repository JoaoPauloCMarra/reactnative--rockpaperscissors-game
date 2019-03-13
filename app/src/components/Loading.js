import React from 'react';

import Container from './Container';
import Text from './Text';

type Props = {
  text?: String,
};
const Loading = ({ text = 'loading...' }): Props => {
  return (
    <Container style={styles.container} centered>
      <Text color="white" size={24} style={styles.text}>
        {text}
      </Text>
    </Container>
  );
};

const styles = {
  container: {
    backgroundColor: '#212121',
  },
  text: {
    textAlign: 'center',
  },
};

export default Loading;
