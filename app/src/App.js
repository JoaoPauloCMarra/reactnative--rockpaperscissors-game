import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import { StatusBar } from 'react-native';
import { auth as FirebaseAuth } from 'react-native-firebase';

import Warzone from './screens/Warzone';
import Loading from './components/Loading';

const App = ({ loading }) => (
  <React.Fragment>
    <StatusBar backgroundColor="#000" barStyle="light-content" />
    {!loading && <Warzone />}
    {!!loading && <Loading />}
  </React.Fragment>
);

export default compose(
  withState('loading', 'setLoading', true),
  lifecycle({
    componentDidMount() {
      FirebaseAuth()
        .signInAnonymously()
        .then(() => {
          this.props.setLoading(false);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (__DEV__) {
            console.tron.log({ errorCode, errorMessage });
          }
        });
    },
  })
)(App);
