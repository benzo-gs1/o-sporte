<template>
  <article-section name="home.games" class="game-section">
    <nav class="games-navigation d-flex align-center justify-between px-6 py-3">
      <div class="actions d-flex align-center">
        <button
          v-for="item in navigation"
          :key="item.name"
          class="action clickable pr-10"
          :class="{
            action_active: item.action == games.value,
          }"
          @click="setValue(item.action)"
        >
          {{ $t(item.name) }}
        </button>
      </div>
      <v-select
        v-model="category"
        :options="['Футбол']"
        :clearable="false"
        class="selector"
      ></v-select>
    </nav>
    <div v-if="selectedList.length" class="content-grid">
      <game-block
        v-for="game in selectedList"
        :key="game.id"
        :game="game"
      ></game-block>
    </div>
    <loading-icon v-else></loading-icon>
  </article-section>
</template>

<script>
import VSelect from "vue-select";

export default {
  name: "GamesSection",
  components: {
    VSelect,
  },
  data() {
    return {
      category: "Футбол",
      games: {
        value: "today",
        yesterday: [
          {
            id: 5,
            title: "«Астана» — «Кайрат»",
            time: "18:00",
            result: {
              first: 1,
              last: 0,
            },
          },
        ],
        today: [
          {
            id: 1,
            title: "«Экибастуз» — «Байконур»",
            time: "10:00",
            result: {
              first: 1,
              last: 2,
            },
          },
          {
            id: 2,
            title: "«Актобе» — «Алтай»",
            time: "11:00",
            result: {
              first: null,
              last: null,
            },
          },
          {
            id: 3,
            title: "«Арысь» — «Махтаарал»",
            time: "15:00",
            result: {
              first: null,
              last: null,
            },
          },
        ],
        tomorrow: [
          {
            id: 4,
            title: "«Кайрат-Жастар» — «Атырау»",
            time: "16:30",
            result: {
              first: null,
              last: null,
            },
          },
        ],
      },
      navigation: [
        { name: "home.games-navigation.yesterday", action: "yesterday" },
        { name: "home.games-navigation.today", action: "today" },
        { name: "home.games-navigation.tomorrow", action: "tomorrow" },
      ],
    };
  },
  computed: {
    selectedList() {
      return this.games[this.games.value] || [];
    },
  },
  methods: {
    setValue(action) {
      this.games.value = action;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-grid {
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  border: 1px solid $colorLightGray;
}
.games-navigation {
  min-height: 70px;
  background-color: $colorLightGray;
  border-radius: 5px;
  flex-wrap: wrap;
}
.selector {
  min-width: 200px;
  background-color: $colorWhite;
}
.action {
  transition: 0.3s all ease;
  font-family: Proxima Nova;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  background-color: transparent;

  &_active {
    text-decoration-line: underline;
    color: $colorTag;
  }
}

@media (max-width: $bpMobileMax + 100px) {
  .selector {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
