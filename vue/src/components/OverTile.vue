<template>
  <h2>Partie terminée!</h2>
  <button @click="reload">Démarrer une nouvelle partie</button>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload();
    },
  },
};
</script>
