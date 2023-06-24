<template>
  <h2>Card selector</h2>
  <div v-for="card in randomCards" :key="card.id">
    <div @click="play(card)">
      <h3>{{ card.title }}</h3>
    </div>
  </div>
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

export default {
  data: () => ({
    cards: [],
    randomCards: [],
  }),
  mounted() {
    onSnapshot(collection(db, 'cards'), (snapshot) => {
      this.cards = [];
      snapshot.forEach((doc) => {
        this.cards.push(doc.data());
      });
      const shuffled = [...this.cards].sort(() => 0.5 - Math.random());
      this.randomCards = shuffled.slice(0, 3);
    });
  },
  methods: {
    play(card) {
      this.$emit('play', card);
    },
  },
};
</script>
