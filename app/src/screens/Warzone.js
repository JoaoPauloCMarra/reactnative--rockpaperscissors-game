import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { graphql } from 'react-apollo';
import { auth as FirebaseAuth } from 'react-native-firebase';

import Container from '../components/Container';
import Text from '../components/Text';
import Spacer from '../components/Spacer';
import Scoreboard from '../components/Scoreboard';
import Actions from '../components/Actions';
import Computation from '../components/Computation';
import Reaction from '../components/Reaction';

import RequestLoading from '../components/RequestLoading';
import RequestError from '../components/RequestError';
import UserQuery from '../queries/UserQuery';
import UserMutation from '../mutations/UserMutation';

const defaultPlayerValue = { matches: 0, wins: 0, losses: 0, draws: 0 };

const Warzone = ({
  data: { player = defaultPlayerValue },
  scoreA,
  scoreB,
  showResult,
  handleUserChoice,
  computating,
  text,
  playerChoice,
  cpuChoice,
  handleReplay,
}) => {
  const { matches, wins, losses, draws } = player || defaultPlayerValue;
  return (
    <Container centered style={styles.container}>
      <Text title>Rock, Paper and Scissors</Text>
      <Text>
        W: {wins || '0'} L: {losses || '0'} D: {draws || '0'} of Total: {matches || '0'}
      </Text>
      <Spacer height={10} />
      <Scoreboard scoreA={scoreA} scoreB={scoreB} />
      <Spacer height={50} />
      {!showResult && <Actions onChoiceMade={handleUserChoice} />}
      {!!showResult && (
        <React.Fragment>
          {!!computating && <Computation />}
          {!computating && (
            <Reaction {...{ text, playerChoice, cpuChoice }} onReplay={handleReplay} />
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

const styles = {
  container: {
    backgroundColor: '#212121',
  },
};

export default compose(
  withState('playerId', 'setPlayerId', null),
  lifecycle({
    componentDidMount() {
      const Auth = FirebaseAuth();
      const playerId = Auth && Auth.currentUser ? Auth.currentUser.uid : null;
      this.props.setPlayerId(playerId);
    },
  }),
  graphql(UserQuery.player, {
    options: ({ playerId }) => ({
      variables: {
        playerId: String(playerId),
      },
    }),
  }),
  graphql(UserMutation.saveMatch),
  RequestError(),
  RequestLoading(),
  withState('scoreA', 'setScoreA', 0),
  withState('scoreB', 'setScoreB', 0),
  withState('result', 'setResult', {}),
  withState('showResult', 'setShowResult', false),
  withState('text', 'setText', ''),
  withState('playerChoice', 'setPlayerChoice', ''),
  withState('cpuChoice', 'setCpuChoice', ''),
  withState('computating', 'setComputating', false),
  withHandlers({
    handleUserChoice: ({
      setComputating,
      scoreA,
      scoreB,
      setShowResult,
      setResult,
      setText,
      setPlayerChoice,
      setCpuChoice,
      setScoreA,
      setScoreB,
      mutate,
      playerId,
      data: { refetch },
    }) => choice => {
      setComputating(true);
      const choices = ['rock', 'paper', 'scissors'];
      const results = {
        l: 'CPU wins ;(',
        w: 'Player wins :D',
        d: 'Draw :|',
      };
      const cpuChoice = Math.floor(Math.random() * 3);
      const playerChoice = choices.indexOf(choice);

      let result = '...';
      let nextScoreA = scoreA;
      let nextScoreB = scoreB;

      if (playerChoice === cpuChoice) {
        result = 'd';
      } else if (
        (playerChoice === 0 && cpuChoice === 2) ||
        (playerChoice === 1 && cpuChoice === 0) ||
        (playerChoice === 2 && cpuChoice === 1)
      ) {
        result = 'w';
        nextScoreA++;
      } else {
        result = 'l';
        nextScoreB++;
      }

      return mutate({
        variables: {
          playerId,
          result,
        },
      })
        .then(() => {
          setShowResult(true);
          return setTimeout(() => {
            setResult(result);
            setText(results[result]);
            setPlayerChoice(choices[playerChoice]);
            setCpuChoice(choices[cpuChoice]);
            setScoreA(nextScoreA);
            setScoreB(nextScoreB);
            refetch();
            setComputating(false);
          }, 2500);
        })
        .catch(error => {
          console.tron.log('WarzoneMutationError: ', error);
        });
    },
    handleReplay: ({ setShowResult }) => () => {
      setShowResult(false);
    },
  })
)(Warzone);
