<template>
  <div class="over">
    <h1>Partie terminée!</h1>
    <button @click="reload">Démarrer une nouvelle partie</button>
  </div>
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

<style lang="scss">
.over {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 50px;
  text-align: center;

  h1 {
    font-size: 40px;
  }

  button {
    display: block;
    width: 200px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
