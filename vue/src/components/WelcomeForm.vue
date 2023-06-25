<template>
  <div class="tile">
    <h1>
      <img src="@/assets/img/logo.gif" alt="Ayayahuasca!" />
    </h1>
    <img
      src="@/assets/img/tourist.png"
      alt="A tourisst looking for some trips"
      class="portrait"
    />
    <h2>Enter the code displayed on the main screen!</h2>
    <div class="error" :class="{ 'is-visible': error }">
      Invalid activation code.
    </div>
    <form @submit.prevent="login">
      <input type="number" v-model="activationCode" />
      <button>Join Game</button>
    </form>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

export default {
  emits: ['login'],
  data: () => ({
    activationCode: '',
    error: false,
  }),
  methods: {
    login() {
      getDoc(doc(db, 'games', 'i' + this.activationCode)).then((docSnap) => {
        if (docSnap.exists()) {
          this.$emit('login', docSnap.id);
        } else {
          this.error = true;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import 'node_modules/pixel-borders/src/styles/pixel-borders/pixel-borders-mixins';

.error {
  margin-bottom: 10px;
  color: red;
  font-size: 20px;
  text-align: center;
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }
}
</style>
