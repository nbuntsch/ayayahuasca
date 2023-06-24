<template>
  <h1>APP</h1>
  <div v-if="game.overdose">
    overdose: {{ game.overdose }}<br />
    mood: {{ game.mood }}<br />
    excitement: {{ game.excitement }}
  </div>
  <button @click="createGame">Create game</button>
  <button @click="startGame">Start game</button>
  <welcome-form v-if="!gameId" @login="login"></welcome-form>
  <div v-if="player">
    <idle-tile v-if="player.status === 'idle'"></idle-tile>
    <card-selector
      v-if="player.status === 'playing'"
      @play="play"
    ></card-selector>
  </div>
</template>

<script>
import {
  doc,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/init.js';
import { v4 as uuidv4 } from 'uuid';

import WelcomeForm from '@/components/WelcomeForm.vue';
import IdleTile from '@/components/IdleTile.vue';
import CardSelector from '@/components/CardSelector.vue';

export default {
  components: {
    WelcomeForm,
    IdleTile,
    CardSelector,
  },
  data: () => ({
    game: {},
    gameId: null,
    playerIndex: null,
  }),
  computed: {
    player() {
      if (!this.game.players) return null;
      return this.game.players[this.playerIndex];
    },
  },
  methods: {
    createGame() {
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

      alert('game id : i' + gameId);
    },
    login(gameId) {
      this.gameId = gameId;
      this.createPlayer();
      onSnapshot(doc(db, 'games', this.gameId), (snapshot) => {
        this.game = snapshot.data();
      });
    },
    createPlayer() {
      getDoc(doc(db, 'games', this.gameId)).then((game) => {
        const data = game.data();
        data.players.push({ id: uuidv4(), status: 'idle' });
        const gameDoc = doc(db, 'games', this.gameId);
        updateDoc(gameDoc, data);
        this.playerIndex = data.players.length - 1;
      });
    },
    startGame() {
      this.game.status = 'playing';
      this.updateGame();
      this.chooseFirstPlayer();
    },
    updateGame() {
      const game = doc(db, 'games', this.gameId);
      updateDoc(game, this.game);
    },
    chooseFirstPlayer() {
      const randomIndex = Math.floor(Math.random() * this.game.players.length);
      this.game.players[randomIndex].status = 'playing';
      this.updateGame();
    },
    play(card) {
      this.game.overdose += card.overdose;
      this.game.mood += card.mood;
      this.game.excitement += card.excitement;
      this.game.players[this.playerIndex].status = 'idle';
      const randomIndex = Math.floor(Math.random() * this.game.players.length);
      setTimeout(() => {
        this.game.players[randomIndex].status = 'playing';
        this.updateGame();
      }, 200);
    },
  },
};
</script>
