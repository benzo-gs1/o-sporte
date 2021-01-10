<template>
  <article class="popular-block d-flex flex-column pa-7" :style="styles">
    <category-link
      class="mb-2 category"
      :category-id="post.category.id"
      :name="$t('categories.' + post.category.slug)"
    ></category-link>
    <header-4 :class="header" :title="post.title" :link="post.slug"></header-4>
    <date-block class="date sub-header mt-4" :date="post.date"></date-block>
    <post-link class="image overlay" :link="post.slug">
      <img v-lazy-load :src="post.image.link" :alt="post.image.alt" />
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

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      @extend .overlay;
      z-index: 0;
      background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 98.41%);
    }
  }

  &:nth-child(2),
  &:nth-child(3) {
    min-height: 230px;
    max-height: 230px;
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
.category {
  align-self: flex-start;
}

@media (max-width: $bpTabletMax) {
  .popular-block {
    &:nth-child(1) {
      min-height: 500px;
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
      max-height: 250px;
    }
  }
}
</style>
