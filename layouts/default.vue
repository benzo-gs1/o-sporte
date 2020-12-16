<template>
  <div id="app">
    <app-header></app-header>
    <main id="main">
      <Nuxt :key="routeKey" />
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
export default {
  computed: {
    routeKey() {
      return this.$route.fullPath;
    },
  },
  watch: {
    $route: "scrollBehavior",
  },
  mounted() {
    this.scrollBehavior(this.$route);
  },
  methods: {
    scrollBehavior(route) {
      this.$el.scrollTop = 0;
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  outline: none;
  font-family: "SeroPro";
}

*::-webkit-scrollbar {
  width: 0.5em;
  height: 0.5em;
}

*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
}

#main {
  flex-grow: 1;
}

@media (max-width: $bpMobileMax) {
  *::-webkit-scrollbar {
    width: 0.3em;
    height: 0.3em;
  }
}
</style>
