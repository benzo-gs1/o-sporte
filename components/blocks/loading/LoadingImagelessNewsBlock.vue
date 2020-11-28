<template>
  <div class="news-block d-flex flex-column justify-between">
    <div class="news-title ma-3">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, velit.
      Lorem, ipsum
    </div>
    <div class="category-wrapper mt-4 pa-2 d-flex align-center">
      <div class="category">loremipsum</div>
      <span class="mx-2">|</span>
      <div class="date">2020 01 01</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingImagelessNewsBlock",
};
</script>

<style lang="scss" scoped>
.news-block {
  grid-column: span 4;
  min-height: 110px;
  background-color: $colorLoader;
}

.news-title,
.category,
.date {
  @extend .loader;
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
