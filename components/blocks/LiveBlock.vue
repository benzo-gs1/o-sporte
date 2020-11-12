<template>
  <article class="live-block d-flex flex-column">
    <div class="image">
      <img :src="image" alt="live-footage" />
    </div>
    <div class="d-flex flex-column content pa-5">
      <category-link
        class="category"
        :category-id="12"
        :name="post.category"
      ></category-link>
      <h3 class="h3 mt-1">{{ post.title }}</h3>
      <p class="description mt-1">{{ post.description }}</p>
      <p class="time mt-6">{{ post.time }}</p>
      <category-link
        class="mt-4"
        :category-id="12"
        name="В ЭФИРЕ"
      ></category-link>
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
  min-width: 580px;
  width: 580px;
  border-radius: 10px;
  border: 2px solid $colorLightGray;
  overflow: hidden;

  margin-right: 40px;
  transform: translateX(20px);
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
@media (max-width: $bpTabletMin) {
  .live-block {
    min-width: 537px;
    width: 537px;
  }
}
@media (max-width: $bpMobileMax + 100px) {
  .live-block {
    min-width: 325px;
    width: 325px;
  }

  .h3 {
    font-size: 24px !important;
    line-height: 29px !important;
    letter-spacing: 0em !important;
  }
}
</style>
