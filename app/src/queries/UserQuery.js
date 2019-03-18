import gql from 'graphql-tag';

const player = gql`
  query Player($playerId: String!) {
    player(id: $playerId) {
      id
      name
      matches
      wins
      losses
      draws
      last_match
    }
  }
`;

const ranking = gql`
  {
    players {
      id
      name
      matches
      wins
      losses
      draws
      last_match
    }
  }
`;

export default {
  player,
  ranking,
};
