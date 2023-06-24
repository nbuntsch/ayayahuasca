<template>
  <h2>Card selector</h2>
  <div class="cards">
    <div v-for="card in randomCards" :key="card.id">
      <div @click="play(card)">
        <card-item :card="card"></card-item>
      </div>
    </div>
  </div>
  <img :src="imgUrl" alt="" />
</template>

<script>
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

import CardItem from '@/components/CardItem.vue';

export default {
  components: {
    CardItem,
  },
  data: () => ({
    cards: [],
    randomCards: [],
    imgUrl: '',
  }),

  mounted() {
    onSnapshot(collection(db, 'cards'), (snapshot) => {
      this.cards = [];
      snapshot.forEach((doc) => {
        this.cards.push({ ...{ id: doc.id }, ...doc.data() });
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

<style lang="scss">
.cards {
  display: flex;
}
</style>
