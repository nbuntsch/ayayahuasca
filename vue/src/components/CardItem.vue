<template>
  <img class="card-item" :src="imgUrl" alt="" />
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgUrl() {
      return require(`@/assets/cards/${this.card.id}.png`);
    },
  },
};
</script>

<style lang="scss">
.card-item {
  width: auto;
  max-height: calc(100vh / 3 - 50px);
}
</style>
