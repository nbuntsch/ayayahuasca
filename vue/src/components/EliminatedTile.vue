<template>
  <div class="tile">
    <h1>
      <img src="@/assets/img/logo.gif" alt="Ayayahuasca!" />
    </h1>
    <img
      src="@/assets/img/tourist-gameover.png"
      alt="A tourisst looking for some trips"
      class="portrait"
    />
    <h2>Oh shit! You went too far and killed the tourist!</h2>
    <button @click="reload">Want to play again?</button>
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
