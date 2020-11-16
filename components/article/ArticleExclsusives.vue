<template>
  <aside>
    <h3 class="exclusives-title">Эксклюзив</h3>
    <div v-if="posts.length" class="mt-8 d-flex flex-column">
      <article-exclusive
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="mb-5"
      ></article-exclusive>
    </div>
    <loading-icon v-else></loading-icon>
  </aside>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ArticleExclusives",
  async fetch() {
    const { data } = await this.fetchPostExclusives();
    this.posts = data;
  },
  fetchOnServer: false,
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    ...mapActions(["fetchPostExclusives"]),
  },
};
</script>

<style lang="scss" scoped>
.exclusives-title {
  font-family: Proxima Nova;
  font-size: 30px;
  font-weight: 700;
  line-height: 37px;
  letter-spacing: 0em;
}
</style>
