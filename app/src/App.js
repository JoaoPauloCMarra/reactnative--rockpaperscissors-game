import React from 'react';
import compose from 'recompose/compose';
import branch from 'recompose/branch';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import { StatusBar } from 'react-native';
import { auth as FirebaseAuth } from 'react-native-firebase';
import { graphql } from 'react-apollo';

import RequestLoading from './components/RequestLoading';
import RequestError from './components/RequestError';
import UserQuery from './queries/UserQuery';

import Warzone from './screens/Warzone';
import PlayerInfo from './screens/PlayerInfo';
import Loading from './components/Loading';

const App = ({ playerId, playerData }) => {
  const { player, refetch } = playerData || { player: undefined, refetch: undefined };

  return (
    <React.Fragment>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      {(!playerId || !player) && <Loading />}
      {playerId && player && !player.name && <PlayerInfo data={player} onFinish={refetch} />}
      {playerId && player && player.name && <Warzone data={player} refetch={refetch} />}
    </React.Fragment>
  );
};

export default compose(
  RequestError(),
  RequestLoading(),
  withState('playerId', 'setPlayerId', null),
  lifecycle({
    componentDidMount() {
      const { setPlayerId } = this.props;
      FirebaseAuth()
        .signInAnonymously()
        .then(({ user: { uid: playerId } }) => {
          setPlayerId(playerId);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (__DEV__) {
            console.tron.error({ errorCode, errorMessage });
          }
        });
    },
  }),
  branch(
    ({ playerId }) => !!playerId,
    graphql(UserQuery.player, {
      name: 'playerData',
      options: ({ playerId }) => ({
        variables: {
          playerId: String(playerId),
        },
      }),
    })
  )
)(App);
