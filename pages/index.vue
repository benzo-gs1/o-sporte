<template>
  <div id="home-page">
    <popular-section></popular-section>
    <news-section></news-section>
    <!-- <div class="adds adds-placeholder mt-10 mb-8" style="height: 100px"></div> -->
    <exclusives-section></exclusives-section>
    <games-section></games-section>
    <live-section></live-section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  head() {
    return {
      title: this.$t("home.title"),
    };
  },
};
</script>
