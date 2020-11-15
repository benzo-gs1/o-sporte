<template>
  <nuxt-link class="tag_small" :to="path">
    {{ name }}
  </nuxt-link>
</template>

<script>
export default {
  name: "CategoryLink",
  props: {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    path() {
      return {
        path: "/search",
        query: {
          category: this.categoryId,
          page: 1,
        },
        force: true,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.tag_small {
  color: $colorTag;
  text-decoration: none;
}
</style>
