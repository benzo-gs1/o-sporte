<template>
  <article-section name="home.exclusives" class="mb-20">
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
    this.posts = await this.fetchExclusive();
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
  gap: 40px;
}
</style>
