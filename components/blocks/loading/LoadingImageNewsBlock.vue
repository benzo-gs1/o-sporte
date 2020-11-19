<template>
  <div class="news-block d-flex pa-3">
    <div class="image mr-10"></div>
    <div class="text-wrapper d-flex flex-column justify-between">
      <div class="header-wrapper">
        <div class="news-title">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum,
          velit. Lorem, ipsum
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
  </div>
</template>

<script>
export default {
  name: "LoadingImageNewsBlock",
};
</script>

<style lang="scss" scoped>
.news-block {
  grid-column: span 4;
  min-height: 260px;
  background-color: $colorLightGray;
}
.text-wrapper {
  flex: 1;
}
.image {
  flex: 1;
  height: 260px;
  overflow: hidden;
}

.news-title,
.sub-header,
.category,
.image,
.date {
  @extend .loader;
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
