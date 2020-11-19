<template>
  <section id="search-page" class="content-wrapper">
    <client-only>
      <h2 class="h2 mt-10 mb-8 d-flex align-center">
        <span>{{ $t("search-page.title") }}</span>
        <span v-if="$route.query.query"> &ndash; "{{ title }}"</span>
      </h2>
      <template v-if="loading">
        <loading-icon></loading-icon>
      </template>
      <template v-else-if="total">
        <p class="mt-2 mb-6 found">
          {{ $t("search-page.found", { total }) }}
        </p>
        <div class="content-grid">
          <image-news-block
            v-for="post in firstBlock"
            :key="post.id"
            :post="post"
          ></image-news-block>
          <hr v-if="imageless.length" class="hr" />
          <imageless-news-block
            v-for="post in imageless"
            :key="post.id"
            :post="post"
          ></imageless-news-block>
          <hr v-if="secondBlock.length" class="hr" />
          <!-- <div class="ad"></div> -->
          <image-news-block
            v-for="post in secondBlock"
            :key="post.id"
            :post="post"
          ></image-news-block>
        </div>
        <div class="pagination-wrapper mt-10">
          <pagination :total="total" :page="page" @page-change="pageChange" />
        </div>
      </template>
      <template v-else>
        <p class="mt-2 mb-6 found">
          {{ $t("no-data") }}
        </p>
      </template>
    </client-only>
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
      loading: false,
    };
  },
  computed: {
    title() {
      const { category, query } = this.$route.query;
      return query ?? category ?? "...";
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
    isCategory() {
      const { category } = this.$route.query;
      return Boolean(category);
    },
    pageTitle() {
      if (this.loading || this.total) {
        if (this.isCategory) {
          return "Поиск по категории";
        }
        return this.$t("search-page.meta-title", {
          title: this.title,
          page: this.page,
        });
      }

      return this.$t("no-data");
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

    this.page = Number.parseInt(page);
  },
  methods: {
    ...mapMutations(["toggleSearching"]),
    ...mapActions(["searchPosts"]),
    async fetchPosts() {
      const { category, query } = this.$route.query;
      this.loading = true;
      const { data, total } = await this.searchPosts({
        query,
        category,
        page: this.page,
      });
      this.total = total;
      this.posts = data;
      this.loading = false;
    },
    pageChange(page) {
      const { category, query } = this.$route.query;
      this.$router.push({
        path: "/search",
        query: {
          page,
          category,
          query,
        },
      });
    },
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Поиск новостей на ОСпорте. Информационный портал про спортивные новости.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "спорт,новости",
        },
      ],
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
  height: auto;
  grid-auto-rows: min-content;
}
</style>
