<template>
  <article class="popular-block d-flex flex-column pa-7" :style="styles">
    <category-link
      class="mb-2"
      :category-id="post.categories[0]"
      :name="post.category"
    ></category-link>
    <header-4
      :class="header"
      :title="post.title.rendered"
      link="some-url"
    ></header-4>
    <date-block class="date sub-header mt-4" :date="post.date"></date-block>
    <post-link class="image overlay" link="some-url">
      <img :src="post.media.guid.rendered" :alt="post.media.alt_text" />
    </post-link>
  </article>
</template>

<script>
export default {
  name: "PopularBlock",
  props: {
    area: {
      type: String,
      required: true,
    },
    post: {
      type: Object,
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
      background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 98.41%);
    }
  }
}
.h4,
.h6 {
  text-decoration: none;
  color: $colorWhite;
  z-index: 1;
}
.date {
  color: $colorLightGray;
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
