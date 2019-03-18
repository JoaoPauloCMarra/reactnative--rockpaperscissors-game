import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { graphql } from 'react-apollo';

import RequestLoading from '../components/RequestLoading';
import RequestError from '../components/RequestError';
import UserMutation from '../mutations/UserMutation';

import Container from '../components/Container';
import Text from '../components/Text';
import Input from '../components/Input';
import Touchable from '../components/Touchable';
import Spacer from '../components/Spacer';

const PlayerInfo = ({ name, setName, saving, handleSaveInfo }) => (
  <Container centered style={styles.container}>
    <Text title style={styles.title}>
      Hey, It's time to save your Name:
    </Text>
    <Spacer height={20} />
    <Input disabled={saving} style={styles.nameInput} value={name} onChangeText={setName} />
    <Spacer height={10} />
    {!saving && (
      <Touchable button style={styles.button} onPress={handleSaveInfo}>
        <Text color="#fff" style={styles.buttonText}>
          Save and Play!
        </Text>
      </Touchable>
    )}
    {!!saving && (
      <Touchable>
        <Text size={18} style={styles.loading}>
          saving...
        </Text>
      </Touchable>
    )}
  </Container>
);

const styles = {
  container: {
    backgroundColor: '#545454',
  },
  title: {
    width: '60%',
    textAlign: 'center',
  },
  nameInput: {
    container: {
      marginTop: 20,
      width: '60%',
    },
    input: {
      fontWeight: '900',
      textAlign: 'center',
    },
  },
  button: {
    backgroundColor: '#333',
    width: '60%',
  },
  buttonText: {
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
  },
};

export default compose(
  RequestError(),
  RequestLoading(),
  graphql(UserMutation.saveInfo),
  withState('saving', 'setSaving', false),
  withState('name', 'setName', ''),
  withHandlers({
    handleSaveInfo: ({ data: { id: playerId }, name, setSaving, mutate, onFinish }) => () => {
      setSaving(true);
      return mutate({
        variables: {
          playerId,
          name: name && name.length > 0 ? name : undefined,
        },
      })
        .then(() => onFinish())
        .catch(error => {
          console.tron.log('PlayerInfoSaveError: ', error);
          setSaving(false);
        });
    },
  })
)(PlayerInfo);
