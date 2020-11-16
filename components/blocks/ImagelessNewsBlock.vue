<template>
  <article class="news-block d-flex flex-column justify-between">
    <header-5
      class="news-title"
      :title="post.title"
      :link="post.slug"
    ></header-5>
    <div class="category-wrapper mt-4">
      <category-link
        :category-id="post.category.id"
        :name="$t('categories.' + post.category.slug)"
      ></category-link>
      <span class="mx-2 date">|</span>
      <date-block :date="date"></date-block>
    </div>
  </article>
</template>

<script>
export default {
  name: "ImagelessNewsBlock",
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
  min-height: 110px;
}
@media (max-width: $bpTabletMin) {
  .news-title {
    font-size: 20px !important;
    line-height: 24px !important;
    letter-spacing: 0em !important;
  }
}
@media (max-width: $bpMobileMax) {
  .news-block {
    grid-column: span 8;
  }
}
</style>
