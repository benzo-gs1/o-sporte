<template>
  <section id="search-page" class="content-wrapper">
    <h2 class="h2 mt-10 mb-8 d-flex align-center">
      {{ $t("search-page.title") }} &ndash; "{{ title }}"
    </h2>
    <p class="mt-2 mb-6 found">
      {{ $t("search-page.found", { total }) }}
    </p>
    <div class="content-grid">
      <image-news-block
        v-for="post in firstBlock"
        :key="post.id"
        :post="post"
      ></image-news-block>
      <hr class="hr" />
      <imageless-news-block
        v-for="post in imageless"
        :key="post.id"
        :post="post"
      ></imageless-news-block>
      <hr class="hr" />
      <!-- <div class="ad"></div> -->
      <image-news-block
        v-for="post in secondBlock"
        :key="post.id"
        :post="post"
      ></image-news-block>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "SearchView",
  fetchOnServer: false,
  async fetch() {
    await this.fetchPosts();
  },
  data() {
    return {
      posts: [],
      page: 1,
      total: 0,
    };
  },
  computed: {
    title() {
      const { category, query } = this.$route.query;
      return query ?? category;
    },
    firstBlock() {
      return this.posts.filter((item) => item.image).slice(0, 4);
    },
    imageless() {
      return this.posts.filter((item) => !item.image);
    },
    secondBlock() {
      return this.posts.filter(
        (item) => item.image && !this.firstBlock.includes(item)
      );
    },
  },
  created() {
    if (this.$store.state.isSearching) this.toggleSearching();

    const { category, query, page } = this.$route.query;
    if (!page) {
      return this.$router.replace({
        path: "/search",
        query: {
          page: 1,
          category,
          query,
        },
      });
    }
    if (!category && !query) {
      return this.$router.replace("/");
    }
  },
  methods: {
    ...mapMutations(["toggleSearching"]),
    ...mapActions(["searchPosts"]),
    async fetchPosts() {
      const { category, query } = this.$route.query;
      const { data, total } = await this.searchPosts({
        query,
        category,
        page: this.page,
      });
      this.total = total;
      this.posts = data;
    },
  },
  head() {
    return {
      title: `Поиск: ${this.title} | Страница ${this.page}`,
    };
  },
};
</script>

<style lang="scss" scoped>
.found {
  font-family: Proxima Nova;
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
}
.content-grid {
  gap: 40px;
  grid-auto-rows: min-content;
}
</style>
