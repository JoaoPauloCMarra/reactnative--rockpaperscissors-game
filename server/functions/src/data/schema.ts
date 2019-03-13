import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const Types = `
  type Player {
    id: String!
    matches: Int
    wins: Int
    draws: Int
    losses: Int
  }
`;

const Queries = `
  type Query {
    players: [Player]
    player(id: String!): Player
  }
`;

const Mutations = `
  type Mutation {
    saveMatch (
      playerId: String!
      result: String
    ): Player
  }
`;

export default makeExecutableSchema({
  typeDefs: `${Types} ${Queries}${Mutations}`,
  resolvers
});
