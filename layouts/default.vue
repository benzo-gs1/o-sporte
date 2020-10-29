<template>
  <div id="app">
    <app-header></app-header>
    <main id="main">
      <Nuxt class="content-wrapper" />
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

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: hidden;
}

#main {
  flex-grow: 1;
}
</style>
