<template>
  <img
    :src="image"
    :alt="alt"
    :style="styles"
    :class="{ clickable: clickable }"
  />
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "20px",
    },
    clickable: Boolean,
  },
  computed: {
    styles() {
      return {
        width: this.size,
        height: this.size,
      };
    },
    image() {
      return require(`~/assets/icons/${this.name}.svg`);
    },
  },
};
</script>
