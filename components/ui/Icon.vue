<template>
  <a :href="link">
    <img
      :src="image"
      :alt="alt"
      :style="styles"
      :class="{ clickable: clickable }"
    />
  </a>
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
    link: {
      type: String,
      default: null,
    },
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
