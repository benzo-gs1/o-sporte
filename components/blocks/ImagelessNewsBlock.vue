<template>
  <article class="news-block">
    <h5 class="h5 clickable">{{ post.title.rendered }}</h5>
    <div class="category-wrapper mt-8">
      <category-link
        :category-id="post.categories[0]"
        :name="post.category"
      ></category-link>
      <span class="mx-2 date">|</span>
      <span class="date">{{ date }} </span>
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
