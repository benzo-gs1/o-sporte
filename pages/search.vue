<template>
  <div>
    {{ $route.query }}
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SearchView",
  created() {
    if (this.$store.state.isSearching) this.toggleSearching();
  },
  methods: {
    ...mapMutations(["toggleSearching"]),
  },
};
</script>

<style lang="scss" scoped></style>
