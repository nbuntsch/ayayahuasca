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
    <h2>
      Congratulations! You're a responsible dealer who got the tourist high
      without killing him!
    </h2>
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
