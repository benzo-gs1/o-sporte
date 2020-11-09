<template>
  <article class="popular-block d-flex flex-column pa-7" :style="styles">
    <category-link
      :category-id="post.categories[0]"
      :name="post.category"
    ></category-link>
    <h4 :class="header">{{ post.title.rendered }}</h4>
    <span class="date sub-header mt-4">{{ date }}</span>
    <img
      class="overlay image"
      :src="post.media.guid.rendered"
      :alt="post.media.alt_text"
    />
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
    date() {
      return this.post.date;
    },
  },
};
</script>

<style lang="scss" scoped>
.popular-block {
  position: relative;
  justify-content: flex-end;
  overflow: hidden;

  &::after {
    @extend .overlay;

    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 98.41%);
  }

  &:hover {
    .image {
      transition: all 0.3s ease;
      transform: scale(1.1);
    }
  }
}
.h4,
.h6,
.date {
  color: $colorWhite;
  z-index: 1;
}
.date {
  color: $colorLightGray;
}
</style>
