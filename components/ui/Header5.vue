<template>
  <post-link class="h5" :link="link">
    <h4>
      {{ parsedTitle }}
    </h4>
  </post-link>
</template>

<script>
import HeaderMixin from "@/mixins/HeaderMixin";

export default {
  name: "Header5",
  mixins: [HeaderMixin],
};
</script>

<style lang="scss" scoped>
.h5 {
  text-decoration: none;
  color: black;
  z-index: 1;
}
</style>
