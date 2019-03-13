import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as graphqlServerExpress from 'graphql-server-express';
import * as graphqlSchemaPrinter from 'graphql/utilities/schemaPrinter';
import schema from './data/schema';

const { graphqlExpress, graphiqlExpress } = graphqlServerExpress;
const { printSchema } = graphqlSchemaPrinter;

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express();

  graphQLServer.use(cors({ origin: true }));

  // /api/graphql
  graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
      schema,
      context: {},
      formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path
      })
    })
  );

  // /api/graphiql
  graphQLServer.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/api/graphql'
    })
  );

  // /api/schema
  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(schema));
  });

  return graphQLServer;
};

// https://us-central1-<project-name>.cloudfunctions.net/api
export const api = functions.https.onRequest(setupGraphQLServer());
