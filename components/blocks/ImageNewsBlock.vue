<template>
  <article class="news-block d-flex">
    <post-link class="image mr-10" link="some-url">
      <img :src="post.media.guid.rendered" :alt="post.media.alt_text" />
    </post-link>
    <div class="text-wrapper d-flex flex-column justify-between">
      <div class="header-wrapper">
        <header-5 :title="post.title.rendered" link="some-url"></header-5>
        <p class="sub-header mt-2" v-html="description"></p>
      </div>
      <div class="category-wrapper mt-8">
        <category-link
          :category-id="post.categories[0]"
          :name="post.category"
        ></category-link>
        <span class="mx-2 date">|</span>
        <span class="date">{{ date }} </span>
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
  height: 260px;
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
.category {
  font-family: Proxima Nova;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: $colorTag;
}
.date {
  font-family: Proxima Nova;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: $colorGray;
}
</style>
