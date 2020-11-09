<template>
  <article class="exclusive-block d-flex flex-column pa-7 clickable">
    <category-link
      :category-id="post.categories[0]"
      :name="post.category"
    ></category-link>
    <h4 class="h6">{{ post.title.rendered }}</h4>
    <span class="date sub-header mt-4">{{ date }}</span>
    <div class="overlay">
      <img
        class="image"
        :src="post.media.guid.rendered"
        :alt="post.media.alt_text"
      />
    </div>
  </article>
</template>

<script>
export default {
  name: "ExclusiveBlock",
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
.exclusive-block {
  grid-column: span 2;
  position: relative;
  justify-content: flex-end;
  overflow: hidden;

  &::after {
    @extend .overlay;

    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 98.41%);
  }
  height: 415px;
  border-radius: 15px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.2s all ease;
}
.overlay:hover {
  .image {
    transform: scale(1.1);
  }
}

.h6,
.date,
.category {
  color: $colorWhite;
  z-index: 1;
}

.category {
  color: $colorTag;
}
.date {
  color: $colorLightGray;
}
</style>
