<template>
  <div class="game-block d-flex align-center justify-between px-6">
    <div class="d-flex align-center">
      <span class="time mr-6">{{ game.time }}</span>
      <p class="title">{{ game.title }}</p>
    </div>
    <div class="d-flex align-center">
      <span class="summary-text mr-2">{{ $t("home.game-summary") }}</span>
      <div class="summary d-flex align-items justify-center">
        {{ summary }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameBlock",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  computed: {
    summary() {
      const { first, last } = this.game.result;
      if (first == null || last == null) return "-:-";
      return `${first}:${last}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-block {
  width: 50%;
  height: 60px;
}
.time {
  font-family: Proxima Nova;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: $colorBlue;
}
.title {
  font-family: Proxima Nova;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
}
.summary {
  padding-top: 1px;
  width: 30px;
  height: 20px;
  background-color: $colorBlue;
  color: $colorWhite;
}

@media (max-width: $bpTabletMax) {
  .game-block {
    width: 100%;
  }
}
</style>
