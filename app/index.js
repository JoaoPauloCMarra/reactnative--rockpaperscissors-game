import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import { name } from './app.json';
import App from './src/App';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.tron.log('Reactotron Configured'));
}

const API_URI = 'https://us-central1-rock-paper-scissors-d94f5.cloudfunctions.net/api/graphql';

const middlewareLink = setContext(() => ({
  headers: {
    authorization: null, // add token if required
  },
}));

const client = new ApolloClient({
  link: middlewareLink.concat(createHttpLink({ uri: API_URI, credentials: 'same-origin' })),
  cache: new InMemoryCache(),
});

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(name, () => Root);
