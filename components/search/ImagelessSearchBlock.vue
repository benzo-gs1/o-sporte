<template>
  <article class="search-block d-flex flex-column justify-between px-3 py-5">
    <header-5 :title="post.title" :link="post.slug"></header-5>
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
  name: "ImagelessSearchBlock",
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
.search-block {
  grid-column: span 4;
  border-radius: 5px;
  background-color: white;
  min-height: 170px;
}

@media (max-width: $bpMobileMax) {
  .search-block {
    grid-column: span 8;
  }
}
</style>
