<template>
  <article-section name="home.news">
    <div class="content-grid">
      <template v-if="posts.length">
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
      </template>
      <template v-else>
        <loading-imageless-news-block
          v-for="i in [1, 2, 3, 4]"
          :key="i + '-imageless'"
        ></loading-imageless-news-block>
        <hr class="hr" />
        <loading-image-news-block
          v-for="i in [1, 2, 3, 4]"
          :key="i + '-image'"
        ></loading-image-news-block>
      </template>
    </div>
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
