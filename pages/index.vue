<template>
  <div id="home-page">
    <popular-section></popular-section>
    <live-section></live-section>
    <!-- <div class="adds adds-placeholder mt-10 mb-8" style="height: 100px"></div> -->
    <games-section></games-section>
    <news-section></news-section>
    <exclusives-section></exclusives-section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  head() {
    return {
      title: "О Спорте",
    };
  },
};
</script>
