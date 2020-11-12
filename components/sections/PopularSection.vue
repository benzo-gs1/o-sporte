<template>
  <article-section name="home.popular">
    <div v-if="posts.length" class="content-grid">
      <popular-block
        v-for="(area, index) in areas"
        :key="area"
        :post="posts[index]"
        :area="area"
      ></popular-block>
    </div>
    <loading-icon v-else></loading-icon>
  </article-section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PopularSection",
  async fetch() {
    this.posts = await this.fetchPopular();
  },
  fetchOnServer: false,
  data() {
    return {
      posts: [],
      areas: ["big", "small-1", "small-2"],
    };
  },
  methods: {
    ...mapActions(["fetchPopular"]),
  },
};
</script>

<style lang="scss" scoped>
.content-grid {
  min-height: 500px;
  grid-template-areas:
    "big big big big big small-1 small-1 small-1"
    "big big big big big small-2 small-2 small-2";
  gap: 40px;
}

@media (max-width: $bpTabletMax) {
  .content-grid {
    min-height: 0px;
    grid-template-areas:
      "big big big big big big big big"
      "small-1 small-1 small-1 small-1 small-2 small-2 small-2 small-2";
  }
}

@media (max-width: $bpMobileMax) {
  .content-grid {
    min-height: 0px;
    grid-template-areas:
      "big big big big big big big big"
      "small-1 small-1 small-1 small-1 small-1 small-1 small-1 small-1"
      "small-2 small-2 small-2 small-2 small-2 small-2 small-2 small-2";
  }
}
</style>
