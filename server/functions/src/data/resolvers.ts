import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();
const scoresRef = db.collection('scores');

const findPlayer = async (id, withId = false) => {
  const doc = await scoresRef.doc(id).get();
  const data = doc.data();
  const player = {
    name: data && data.name ? data.name : null,
    matches: data && data.matches ? data.matches : 0,
    wins: data && data.wins ? data.wins : 0,
    losses: data && data.losses ? data.losses : 0,
    draws: data && data.draws ? data.draws : 0,
    last_match: data && data.last_match ? data.last_match : null
  };

  return !!withId ? { id: doc.id, ...player } : player;
};

const resolveFunctions = {
  Query: {
    players: async () =>
      (await scoresRef.get()).docs.map(doc => ({ id: doc.id, ...doc.data() })),
    player: async (_, { id }) => await findPlayer(id, true)
  },
  Mutation: {
    saveInfo: async (_, { playerId, name }) => {
      const playerData = await findPlayer(playerId);
      const player = JSON.parse(JSON.stringify(playerData));

      if (name) player.name = name;

      await scoresRef.doc(playerId).set(player);
      return { id: playerId, player };
    },
    saveMatch: async (_, { playerId, result }) => {
      const playerData = await findPlayer(playerId);
      const player = JSON.parse(JSON.stringify(playerData));

      player.last_match = new Date().toISOString();
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
      return { id: playerId, player };
    }
  }
};

export default resolveFunctions;
