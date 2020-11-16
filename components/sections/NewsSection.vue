<template>
  <article-section name="home.news">
    <div v-if="posts.length" class="content-grid">
      <imageless-news-block
        v-for="post in imageless"
        :key="post.id"
        :post="post"
      ></imageless-news-block>
      <hr class="hr" />
      <image-news-block
        v-for="post in withImage"
        :key="post.id"
        :post="post"
      ></image-news-block>
    </div>
    <loading-icon v-else></loading-icon>
  </article-section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewsSection",
  async fetch() {
    const { data } = await this.fetchNewsSection();
    this.posts = data;
  },
  fetchOnServer: false,
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    imageless() {
      return this.posts.filter((post) => !post.image);
    },
    withImage() {
      return this.posts.filter((post) => post.image);
    },
  },
  methods: {
    ...mapActions(["fetchNewsSection"]),
  },
};
</script>

<style lang="scss" scoped>
.content-grid {
  gap: 40px;
}
</style>
