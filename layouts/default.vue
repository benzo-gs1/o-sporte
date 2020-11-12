<template>
  <div id="app">
    <app-header></app-header>
    <main id="main">
      <Nuxt />
    </main>
    <app-footer></app-footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
  outline: none;
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
}

#main {
  flex-grow: 1;
}
</style>
