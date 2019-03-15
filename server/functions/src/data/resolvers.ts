import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();
const scoresRef = db.collection('scores');

const findPlayer = async id => {
  const doc = await scoresRef.doc(id).get();
  const data = doc.data();
  return {
    id: doc.id,
    matches: data && data.matches ? data.matches : 0,
    wins: data && data.wins ? data.wins : 0,
    losses: data && data.losses ? data.losses : 0,
    draws: data && data.draws ? data.draws : 0
  };
};

const resolveFunctions = {
  Query: {
    players: async () =>
      (await scoresRef.get()).docs.map(doc => ({ id: doc.id, ...doc.data() })),
    player: async (_, { id }) => await findPlayer(id)
  },
  Mutation: {
    async saveMatch(_, { playerId, result }) {
      const playerData = await findPlayer(playerId);
      const player = JSON.parse(JSON.stringify(playerData));

      if (!player) {
        throw new Error(`Couldn't find player with ID ${playerId}`);
      }

      player.matches++;
      switch (result) {
        case 'w':
          player.wins++;
          break;
        case 'l':
          player.losses++;
          break;
        case 'd':
          player.draws++;
          break;
        default:
          break;
      }

      await scoresRef.doc(playerId).set(player);
      return player;
    }
  }
};

export default resolveFunctions;
