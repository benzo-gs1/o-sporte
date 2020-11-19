<template>
  <article-section name="home.exclusives" class="exclusives-section">
    <div class="content-grid">
      <template v-if="posts.length">
        <exclusive-block
          v-for="post in posts"
          :key="post.id"
          :post="post"
        ></exclusive-block>
      </template>
      <template v-else>
        <loading-exclusives-block
          v-for="i in [1, 2, 3, 4]"
          :key="i"
        ></loading-exclusives-block>
      </template>
    </div>
  </article-section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ExclusivesSection",
  async fetch() {
    const { data } = await this.fetchExclusive();
    this.posts = data;
  },
  fetchOnServer: false,
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapActions(["fetchExclusive"]),
  },
};
</script>

<style lang="scss" scoped>
.content-grid {
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  width: calc(100% + 40px);
  transform: translateX(-20px);
}
</style>
