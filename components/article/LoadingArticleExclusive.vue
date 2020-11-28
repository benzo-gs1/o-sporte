<template>
  <div class="news-block d-flex flex-column justify-between pa-3 mb-3">
    <div class="category mb-2">loremipsum</div>
    <div class="news-title mt-3">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, velit.
      Lorem, ipsum
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingArticleExclusive",
};
</script>

<style lang="scss" scoped>
.news-block {
  grid-column: span 4;
  height: 110px;
  background-color: $colorLoader;
}
.news-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  display: block;
}

.category {
  align-self: flex-start;
}
.news-title,
.category,
.date {
  @extend .loader;
}
</style>
