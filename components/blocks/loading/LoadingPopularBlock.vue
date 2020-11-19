<template>
  <div class="popular-block d-flex flex-column pa-7" :style="styles">
    <div class="category mb-2">loremip</div>
    <div :class="header">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, velit.
      Lorem, ipsum. Lorem, ipsum.
    </div>
    <div class="date sub-header mt-4">2020 01 01</div>
    <div class="image overlay"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingPopularBlock",
  props: {
    area: {
      type: String,
      required: true,
    },
  },
  computed: {
    styles() {
      return {
        "grid-area": this.area,
      };
    },
    header() {
      if (this.area.includes("small")) return "h6";
      return "h4";
    },
  },
};
</script>

<style lang="scss" scoped>
.popular-block {
  position: relative;
  justify-content: flex-end;
  overflow: hidden;

  .image {
    z-index: 0;

    &::after {
      @extend .overlay;
      z-index: 0;
      background-color: $colorLightGray;
    }
  }
}

.h4,
.h6,
.date,
.category {
  z-index: 1;
  background-color: white;
  color: transparent;
  border-radius: 3px;

  @extend .loader;
}
.date,
.category {
  align-self: flex-start;
}

@media (max-width: $bpTabletMax) {
  .popular-block {
    &:nth-child(1) {
      min-height: 500px;
    }
    &:nth-child(2),
    &:nth-child(3) {
      min-height: 230px;
    }
  }
}
@media (max-width: $bpTabletMin) {
  .h4 {
    font-size: 24px !important;
    line-height: 29px !important;
    letter-spacing: 0em !important;
  }
  .h6 {
    font-size: 16px !important;
    line-height: 19px !important;
    letter-spacing: 0em !important;
  }
  .popular-block {
    &:nth-child(1) {
      min-height: 400px;
    }
    &:nth-child(2),
    &:nth-child(3) {
      min-height: 230px;
    }
    padding: 12px;
  }
}
@media (max-width: $bpMobileMax) {
  .h4 {
    font-size: 16px !important;
    line-height: 19px !important;
    letter-spacing: 0em !important;
  }
  .popular-block {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      min-height: 250px;
    }
  }
}
</style>
