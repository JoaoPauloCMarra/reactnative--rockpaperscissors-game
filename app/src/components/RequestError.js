import React from 'react';
import branch from 'recompose/branch';
import renderComponent from 'recompose/renderComponent';

import Container from './Container';
import Text from './Text';

type Props = {
  children: String,
};
const ErrorDisplayer = (props): Props => {
  console.tron.log({ ErrorDisplayer: props });
  return (
    <Container style={styles.container} centered>
      <Text color="red" style={styles.text}>
        Something went wrong
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

export default (dataLabel = 'data') =>
  branch(props => props[dataLabel] && props[dataLabel].error, renderComponent(ErrorDisplayer));
