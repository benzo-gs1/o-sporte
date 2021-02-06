<template>
  <div id="home-page">
    <popular-section class="content-wrapper"></popular-section>
    <!-- <games-section class="content-wrapper"></games-section> -->
    <exclusives-section class="content-wrapper"></exclusives-section>
    <!-- <div class="adds adds-placeholder mt-10 mb-8" style="height: 100px"></div> -->
    <!-- <live-section class="content-wrapper"></live-section> -->
    <news-section class="content-wrapper"></news-section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  head() {
    return {
      title: this.$t("home.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Домашняя страница. Информационный портал про спортивные новости.",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "спорт,новости",
        },
      ],
    };
  },
};
</script>
