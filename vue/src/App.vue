<template>
  <label>Overdose:</label>
  <input type="text" v-model="overdose" />
  <br />
  <label>Mood:</label>
  <input type="text" v-model="mood" />
  <br />
  <label>Excitement:</label>
  <input type="text" v-model="excitement" />
  <welcome-form :game="game"></welcome-form>
  <hello-world />
</template>

<script>
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

import HelloWorld from '@/components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
    WelcomeForm,
  },
  data: () => ({
    game: [],
  }),
  computed: {
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
  },
};
</script>
