<template>
  <div class="point" :style="styles"></div>
</template>

<script>
export default {
  name: "Point",
  props: {
    size: {
      type: String,
      default: "24px",
    },
    color: {
      type: String,
      default: "#FF0000",
    },
    height: {
      type: String,
      default: "",
    },
  },
  computed: {
    styles() {
      return {
        "background-color": this.color,
        width: this.size,
        height: this.height || this.size,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.point {
  border-radius: 50%;
  display: inline-block;
}
</style>
