<template>
  <h1>Games:</h1>
  <div>{{ games }}</div>
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

export default {
  data() {
    return {
      games: [],
    };
  },
  mounted() {
    onSnapshot(collection(db, 'games'), (snapshot) => {
      this.games = [];
      snapshot.forEach((doc) => {
        this.games.push(doc.data());
      });
    });
  },
};
</script>
