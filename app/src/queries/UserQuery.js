import gql from 'graphql-tag';

const player = gql`
  query Player($playerId: String!) {
    player(id: $playerId) {
      id
      matches
      wins
      losses
      draws
    }
  }
`;

const ranking = gql`
  {
    players {
      id
      matches
      wins
      losses
      draws
    }
  }
`;

export default {
  player,
  ranking,
};
