<template>
  <article class="search-block d-flex flex-column">
    <post-link class="image" :link="post.slug">
      <img :src="post.image.link" :alt="post.image.alt" />
    </post-link>
    <div class="text-wrapper d-flex flex-column justify-between">
      <div class="header-wrapper">
        <header-5
          class="news-title"
          :title="post.title"
          :link="post.slug"
        ></header-5>
        <p class="sub-header mt-2" v-html="description"></p>
      </div>
      <div class="category-wrapper mt-8">
        <category-link
          :category-id="post.category.id"
          :name="$t('categories.' + post.category.slug)"
        ></category-link>
        <span class="mx-2 date">|</span>
        <date-block :date="date"></date-block>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ImageSearchBlock",
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
    description() {
      if (this.post.excerpt.length > 100)
        return this.post.excerpt.slice(0, 97) + "...";
      return this.post.excerpt;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-block {
  grid-column: span 2;
  background-color: white;
  border-radius: 5px;
}

.text-wrapper {
  padding: 10px;
  padding-bottom: 20px;
  height: 100%;
  flex: 1;
}

.image {
  height: 190px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

@media (max-width: $bpDesktopMin) {
  .search-block {
    grid-column: span 4;
  }
}
@media (max-width: $bpMobileMax) {
  .search-block {
    grid-column: span 8;
  }
}
</style>
