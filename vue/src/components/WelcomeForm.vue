<template>
  <h1>Welcome</h1>
  <input type="text" v-model="activationCode" />
  <button @click="login">Play!</button>
  <div>{{ game.players }}</div>
</template>

<script>
export default {
  emits: ['login'],
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activationCode: '',
  }),
  methods: {
    login() {
      if (this.activationCode === this.game.activationCode) {
        this.$emit('login');
      } else {
        alert("Mauvais code d'activation");
      }
    },
  },
};
</script>
