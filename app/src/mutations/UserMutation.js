import gql from 'graphql-tag';

const saveMatch = gql`
  mutation SaveMatch($playerId: String!, $result: String) {
    saveMatch(playerId: $playerId, result: $result) {
      id
    }
  }
`;

export default {
  saveMatch,
};
