import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

initializeApp(firebaseConfig);

const db = getFirestore();
var game = [];

onSnapshot(collection(db, 'games'), (snapshot) => {
  snapshot.forEach((doc) => {
    game = doc.data();
  });
});

const get = (req, res) => {
  return res.status(200).json(game);
};

export default { get };
