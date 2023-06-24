<template>
  <div class="card-item" :style="`background-image:url(${imgUrl})`"></div>
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
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
