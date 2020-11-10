<template>
  <post-link class="h4" :link="link">
    <h4>
      {{ title }}
    </h4>
  </post-link>
</template>

<script>
import HeaderMixin from "@/mixins/HeaderMixin";

export default {
  name: "Header4",
  mixins: [HeaderMixin],
};
</script>

<style lang="scss" scoped>
.h6 {
  text-decoration: none;
  color: $colorWhite;
  z-index: 1;
}
</style>
