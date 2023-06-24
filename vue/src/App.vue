<template>
  <label>Overdose:</label>
  <input type="text" v-model="overdose" />
  <br />
  <label>Mood:</label>
  <input type="text" v-model="mood" />
  <br />
  <label>Excitement:</label>
  <input type="text" v-model="excitement" />
  <br />
  <button @click="resetGame">Reset game</button>
  <button @click="startGame">Start game</button>
  <welcome-form v-if="!playerId" :game="game" @login="login"></welcome-form>
  <card-selector v-else></card-selector>
  <div>player id: {{ playerId }}</div>
  <div>player status: {{ playerStatus }}</div>
  <div>activation code: {{ game.activationCode }}</div>
  <hello-world />
</template>

<script>
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init.js';
import { v4 as uuidv4 } from 'uuid';

import HelloWorld from '@/components/HelloWorld.vue';
import WelcomeForm from '@/components/WelcomeForm.vue';
import CardSelector from '@/components/CardSelector.vue';

export default {
  components: {
    HelloWorld,
    WelcomeForm,
    CardSelector,
  },
  data: () => ({
    game: [],
    playerId: null,
  }),
  computed: {
    playerStatus() {
      if (this.game.players && this.game.players[this.playerId]) {
        return this.game.players[this.playerId].status;
      } else {
        return null;
      }
    },
    overdose: {
      get() {
        return this.game.overdose;
      },
      set(value) {
        this.game.overdose = value;
        this.updateGame();
      },
    },
    mood: {
      get() {
        return this.game.mood;
      },
      set(value) {
        this.game.mood = value;
        this.updateGame();
      },
    },
    excitement: {
      get() {
        return this.game.excitement;
      },
      set(value) {
        this.game.excitement = value;
        this.updateGame();
      },
    },
  },
  mounted() {
    onSnapshot(doc(db, 'games', 'game'), (snapshot) => {
      this.game = snapshot.data();
    });
  },
  methods: {
    updateGame() {
      const game = doc(db, 'games', 'game');
      updateDoc(game, this.game);
    },
    login() {
      this.playerId = uuidv4();
      this.game.players[this.playerId] = { status: 'idle' };
      this.updateGame();
    },
    resetGame() {
      this.game.players = {};
      this.game.status = 'idle';
      this.updateGame();
    },
    startGame() {
      this.game.status = 'playing';
      this.updateGame();
      this.chooseFirstPlayer();
    },
    chooseFirstPlayer() {
      const keys = Object.keys(this.game.players);
      const firstPlayerId = keys[Math.floor(Math.random() * keys.length)];

      this.game.players[firstPlayerId].status = 'playing';
      this.updateGame();
    },
  },
};
</script>
