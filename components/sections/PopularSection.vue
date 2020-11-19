<template>
  <article-section name="home.popular">
    <div class="content-grid">
      <template v-if="posts.length">
        <popular-block
          v-for="(area, index) in areas"
          :key="area"
          :post="posts[index]"
          :area="area"
        ></popular-block>
      </template>
      <template v-else>
        <loading-popular-block
          v-for="area in areas"
          :key="area"
          :area="area"
        ></loading-popular-block>
      </template>
    </div>
  </article-section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PopularSection",
  async fetch() {
    const { data } = await this.fetchPopular();
    this.posts = data;
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
