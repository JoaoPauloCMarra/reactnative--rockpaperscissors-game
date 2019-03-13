import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();
const scoresRef = db.collection('scores');

const findPlayer = async id => {
  const doc = await scoresRef.doc(id).get();
  return { id: doc.id, ...doc.data() };
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
          player.losses++;
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
