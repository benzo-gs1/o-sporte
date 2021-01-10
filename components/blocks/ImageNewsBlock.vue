<template>
  <article class="news-block d-flex">
    <post-link class="image mr-10" :link="post.slug">
      <img v-lazy-load :src="post.image.link" :alt="post.image.alt" />
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
  name: "ImageNewsBlock",
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
        return this.post.excerpt.slice(0, 100);
      return this.post.excerpt;
    },
  },
};
</script>

<style lang="scss" scoped>
.news-block {
  grid-column: span 4;
  min-height: 260px;
}
.text-wrapper {
  flex: 1;
}
.image {
  flex: 1;
  height: 260px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
@media (max-width: $bpTabletMin) {
  .news-block {
    grid-column: span 8;
  }
}
@media (max-width: $bpMobileMax) {
  .news-block {
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid $colorLightGray;
    padding-bottom: 20px;
    min-height: 0px;
  }
  .text-wrapper {
    margin-top: 20px;
    padding: {
      left: 12px;
      right: 12px;
    }
  }
  .news-title {
    font-size: 24px !important;
    line-height: 29px !important;
    letter-spacing: 0em !important;
  }

  .image {
    display: block;
    margin-right: 0px;
    height: 190px;
    border-radius: 10px 10px 0px 0px;
  }
}
</style>
