<template>
  <article class="news-block d-flex">
    <post-link class="image mr-10" link="some-url">
      <img :src="post.media.guid.rendered" :alt="post.media.alt_text" />
    </post-link>
    <div class="text-wrapper d-flex flex-column justify-between">
      <div class="header-wrapper">
        <header-5
          class="news-title"
          :title="post.title.rendered"
          link="some-url"
        ></header-5>
        <p class="sub-header mt-2" v-html="description"></p>
      </div>
      <div class="category-wrapper mt-8">
        <category-link
          :category-id="post.categories[0]"
          :name="post.category"
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
      if (this.post.excerpt.rendered.length > 100)
        return this.post.excerpt.rendered.slice(0, 100);
      return this.post.excerpt.rendered;
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
