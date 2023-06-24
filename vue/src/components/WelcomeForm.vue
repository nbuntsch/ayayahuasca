<template>
  <div class="welcome">
    <h1>Ayayahuasca!</h1>
    <h2>Entre le code qui s'affiche sur l'écran principal!</h2>
    <div class="welcome-error" :class="{ 'is-visible': error }">
      Mauvais code d'activation
    </div>
    <form @submit.prevent="login">
      <input type="number" v-model="activationCode" />
      <button>Rejoindre la partie</button>
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
.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;

  h1 {
    margin-bottom: 50px;
    font-size: 40px;
  }

  h2 {
    margin-bottom: 15px;
    font-size: 20px;
  }

  input {
    display: block;
    width: 200px;
    margin-bottom: 20px;
    font-size: 40px;
    text-align: center;

    &:focus {
      outline: none;
    }
  }

  button {
    display: block;
    width: 200px;
    height: 50px;
    font-size: 20px;
  }
}

.welcome-error {
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
