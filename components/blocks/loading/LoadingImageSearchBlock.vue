<template>
  <article class="search-block d-flex flex-column pa-3">
    <div class="image"></div>
    <div class="text-wrapper d-flex flex-column justify-between">
      <div class="header-wrapper">
        <div class="news-title">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum,
          velit. Lorem, ipsum. Lorem, ipsum.
        </div>
        <p class="sub-header mt-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>
      <div class="category-wrapper mt-8 d-flex align-center">
        <div class="category">loremipsum</div>
        <span class="mx-2">|</span>
        <div class="date">2020 01 01</div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "LoadingImageSearchBlock",
};
</script>

<style lang="scss" scoped>
.search-block {
  grid-column: span 2;
  background-color: white;
  border-radius: 5px;
  background-color: $colorLoader;
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
}

.news-title,
.image,
.date,
.category,
.sub-header {
  @extend .loader;
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
