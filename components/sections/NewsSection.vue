<template>
  <article-section id="news-section" name="home.news" class="mb-16">
    <div class="content-grid">
      <div class="button-wrapper d-flex justify-end">
        <span class="tag_small clickable" @click="fetchNews">Показать еще</span>
      </div>
      <template v-if="imageless.length">
        <imageless-news-block
          v-for="post in imageless"
          :key="post.id"
          :post="post"
        ></imageless-news-block>
      </template>
      <template v-if="loading">
        <loading-imageless-news-block
          v-for="i in [1, 2, 3, 4]"
          :key="i + '-imageless'"
        ></loading-imageless-news-block>
      </template>
      <hr v-if="imageless.length && withImage.length" class="hr" />
      <template v-if="withImage.length">
        <image-news-block
          v-for="post in withImage"
          :key="post.id"
          :post="post"
        ></image-news-block>
      </template>
      <template v-if="loading">
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
    await this.fetchNews(true);
  },
  fetchOnServer: false,
  data() {
    return {
      posts: [],
      pages: 1,
      loading: true,
    };
  },
  computed: {
    imageless() {
      return this.posts.filter((post) => !post.image?.link);
    },
    withImage() {
      return this.posts.filter((post) => post.image?.link);
    },
  },
  methods: {
    ...mapActions(["fetchNewsSection"]),
    async fetchNews(initial = false) {
      if (!initial && this.loading) return;
      this.loading = true;

      const { data, total } = await this.fetchNewsSection(this.pages);
      if (this.pages > 1 && this.pages === total) {
        this.loading = false;
        return;
      }
      this.posts.push(...data);
      this.pages++;

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-grid {
  gap: 30px;
  position: relative;
}
.button-wrapper {
  position: absolute;
  top: -25px;
  right: 0px;
}
.tag_small {
  color: #ff8271;
  text-decoration: none;
}
</style>
