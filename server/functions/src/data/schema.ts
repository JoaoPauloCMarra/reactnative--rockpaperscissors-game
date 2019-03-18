import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const Types = `
  type Player {
    id: String!
    name: String
    matches: Int
    wins: Int
    draws: Int
    losses: Int
    last_match: String
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

    saveInfo (
      playerId: String!
      name: String
    ): Player
  }
`;

export default makeExecutableSchema({
  typeDefs: `${Types} ${Queries}${Mutations}`,
  resolvers
});
