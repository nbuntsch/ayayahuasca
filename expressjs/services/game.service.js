import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();
var games = [];

onSnapshot(collection(db, 'games'), (snapshot) => {
  games = [];
  snapshot.forEach((doc) => {
    games.push({ ...{ id: doc.id }, ...doc.data() });
  });
});

const get = (req, res) => {
  const game = games.find((item) => item.id === 'i' + req.params.gameId);
  return res.status(200).json(game);
};

const create = (req, res) => {
  const gameId = Math.floor(100000 + Math.random() * 900000);
  const game = {
    status: 'idle',
    players: [],
    overdose: 0,
    mood: 0,
    excitement: 0,
  };

  var gamesRef = collection(db, 'games');
  setDoc(doc(gamesRef, 'i' + gameId), game);

  return res.status(200).send(gameId.toString());
};

const start = async (req, res) => {
  getDoc(doc(db, 'games', 'i' + req.params.gameId)).then((game) => {
    const data = game.data();
    const randomIndex = Math.floor(Math.random() * data.players.length);
    data.players[randomIndex].status = 'playing';
    data.status = 'playing';
    const gameDoc = doc(db, 'games', 'i' + req.params.gameId);
    updateDoc(gameDoc, data);
    return res.status(200).json({ gameId: req.params.gameId });
  });
};

export default { get, create, start };
