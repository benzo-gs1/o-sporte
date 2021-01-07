<template>
  <a class="icon" :href="link" :target="target" rel="noopener noreferrer">
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
    blank: {
      type: Boolean,
      default: false,
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
    target() {
      if (this.blank) {
        return "_blank";
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
}
</style>
