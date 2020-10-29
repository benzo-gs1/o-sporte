<template>
  <article class="live-block d-flex flex-column">
    <div class="image">
      <img :src="image" alt="live-footage" />
    </div>
    <div class="d-flex flex-column content pa-5">
      <span class="category">{{ post.category }}</span>
      <h3 class="h3 mt-1">{{ post.title }}</h3>
      <p class="description mt-1">{{ post.description }}</p>
      <p class="time mt-6">{{ post.time }}</p>
      <span class="live mt-4 tag_small clickable">В ЭФИРЕ</span>
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
  width: 580px;
  border-radius: 10px;
  border: 2px solid $colorLightGray;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 314px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.category {
  font-family: Proxima Nova;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: $colorGray;
}
.description {
  font-family: Proxima Nova;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
}
.time {
  font-family: Proxima Nova;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: $colorGray;
}
.live {
  color: $colorTag;
}
</style>
