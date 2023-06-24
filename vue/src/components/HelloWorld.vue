<template>
  <h1>Games:</h1>
  <div>{{ game }}</div>
  <div @click="increment">increment</div>
</template>

<script>
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

export default {
  data() {
    return {
      game: [],
    };
  },
  mounted() {
    onSnapshot(doc(db, 'games', 'game'), (snapshot) => {
      this.game = snapshot.data();
    });
  },
  methods: {
    increment() {
      const game = doc(db, 'games', 'game');
      updateDoc(game, { test: this.game.test + 1 });
    },
  },
};
</script>
