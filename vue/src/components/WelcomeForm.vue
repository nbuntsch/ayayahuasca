<template>
  <h2>Entre le code qui s'affiche sur l'écran principal!</h2>
  <form @submit.prevent="login">
    <input type="text" v-model="activationCode" />
    <button>Rejoindre la partie</button>
  </form>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/init.js';

export default {
  emits: ['login'],
  data: () => ({
    activationCode: '',
  }),
  methods: {
    login() {
      getDoc(doc(db, 'games', 'i' + this.activationCode)).then((docSnap) => {
        if (docSnap.exists()) {
          this.$emit('login', docSnap.id);
        } else {
          alert("Mauvais code d'activation");
        }
      });
    },
  },
};
</script>
