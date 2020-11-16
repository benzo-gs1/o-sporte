<template>
  <div></div>
</template>

<script>
export default {
  name: "Post",
  async asyncData({ params, store }) {
    const id = params.id;
    const post = await store.dispatch("fetchPost", id);
    return {
      post,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
