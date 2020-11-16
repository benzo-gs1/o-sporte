<template>
  <article-section name="home.exclusives" class="exclusives-section">
    <div v-if="posts.length" class="content-grid">
      <exclusive-block
        v-for="post in posts"
        :key="post.id"
        :post="post"
      ></exclusive-block>
    </div>
    <loading-icon v-else></loading-icon>
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
