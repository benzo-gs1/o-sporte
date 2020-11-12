<template>
  <article class="news-block d-flex flex-column justify-between">
    <header-5
      class="news-title"
      :title="post.title.rendered"
      link="some-url"
    ></header-5>
    <div class="category-wrapper mt-4">
      <category-link
        :category-id="post.categories[0]"
        :name="post.category"
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
