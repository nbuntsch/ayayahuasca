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
  emits: ['play'],
  components: {
    CardItem,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
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
      let numberOfCards = 3;
      if (this.game.excitement === -50) {
        numberOfCards = 2;
      } else if (this.game.excitement === -100) {
        numberOfCards = 1;
      }
      const shuffled = [...this.cards].sort(() => 0.5 - Math.random());
      this.randomCards = shuffled.slice(0, numberOfCards);
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

.cards > div {
  width: calc(100% / 3);

  img {
    width: 100%;
  }
}
</style>
