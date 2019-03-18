import gql from 'graphql-tag';

const saveMatch = gql`
  mutation SaveMatch($playerId: String!, $result: String) {
    saveMatch(playerId: $playerId, result: $result) {
      id
    }
  }
`;

const saveInfo = gql`
  mutation SaveInfo($playerId: String!, $name: String) {
    saveInfo(playerId: $playerId, name: $name) {
      id
    }
  }
`;

export default {
  saveMatch,
  saveInfo,
};
