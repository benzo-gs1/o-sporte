<template>
  <article class="news-block d-flex flex-column justify-between">
    <div class="wrapper">
      <category-link
        :category-id="post.category.id"
        :name="$t('categories.' + post.category.slug)"
      ></category-link>
      <header-5
        class="news-title mt-3"
        :title="post.title"
        :link="post.slug"
      ></header-5>
    </div>
    <date-block :date="date"></date-block>
  </article>
</template>

<script>
export default {
  name: "ArticleExclusive",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    date() {
      return this.post.date;
    },
  },
};
</script>

<style lang="scss" scoped>
.news-block {
  grid-column: span 4;
  height: 110px;
}
.news-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  display: block;
}
</style>
