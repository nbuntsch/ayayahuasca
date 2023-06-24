<template>
  <img :src="imgUrl" alt="" />
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
