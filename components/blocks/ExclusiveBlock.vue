<template>
  <article class="exclusive-block d-flex flex-column pa-7">
    <category-link
      :category-id="post.categories[0]"
      :name="post.category"
    ></category-link>
    <Header4 class="h6" :title="post.title.rendered" link="some-url"></Header4>
    <date-block class="date sub-header mt-4" :date="date"></date-block>
    <post-link class="image overlay" link="some-url">
      <img
        class="image"
        :src="post.media.guid.rendered"
        :alt="post.media.alt_text"
      />
    </post-link>
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
  position: relative;
  justify-content: flex-end;
  overflow: hidden;

  min-width: 270px;
  width: 270px;
  height: 415px;
  border-radius: 15px;
  margin-right: 40px;
  transform: translateX(20px);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;

  &::after {
    @extend .overlay;
    z-index: 0;
    background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 98.41%);
  }
}

.h6 {
  color: $colorWhite;
  z-index: 1;
}

.date {
  color: $colorLightGray;
}
</style>
