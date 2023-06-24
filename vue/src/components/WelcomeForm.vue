<template>
  <h1>Welcome Form</h1>
  <input type="text" v-model="activationCode" />
  <button @click="login">Login</button>
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
      getDoc(doc(db, 'games', this.activationCode)).then((docSnap) => {
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
