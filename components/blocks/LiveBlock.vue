<template>
  <article class="live-block d-flex flex-column">
    <div class="image">
      <img v-lazy-load :src="image" alt="live-footage" />
    </div>
    <div class="d-flex flex-column justify-between content pa-5">
      <div class="wrapper">
        <category-link
          class="category"
          :category-id="12"
          :name="post.category"
        ></category-link>
        <h3 class="h4 mt-1">{{ post.title }}</h3>
      </div>
      <p class="description mt-1">{{ post.description }}</p>
      <div class="wrapper d-flex flex-column">
        <p class="time mt-6">{{ post.time }}</p>
        <category-link
          class="mt-4"
          :category-id="12"
          name="В ЭФИРЕ"
        ></category-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "LiveBlock",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      return require(`~/assets/temp/${this.post.image}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-block {
  min-width: 380px;
  width: 380px;
  border-radius: 10px;
  border: 2px solid $colorLightGray;
  overflow: hidden;

  margin-right: 40px;
  transform: translateX(20px);
}

.image {
  width: 100%;
  height: 160px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.content {
  height: 100%;
}
.category {
  color: $colorGray;
}
.description {
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
}
.time {
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: $colorGray;
}
@media (max-width: $bpMobileMax + 100px) {
  .live-block {
    min-width: 280px;
    width: 280px;
  }
  .h4 {
    font-size: 1.8rem;
  }
}
</style>
