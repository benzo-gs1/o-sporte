<template>
  <article-section name="home.live" live>
    <div v-if="posts.length" class="content-grid">
      <live-block
        v-for="post in posts"
        :key="post.id"
        :post="post"
      ></live-block>
    </div>
    <loading-icon v-else></loading-icon>
  </article-section>
</template>

<script>
export default {
  name: "LiveSection",
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Баутиста – Каррено",
          subTitle: "«Ролан Гаррос» | Мужчины. Третий круг",
          time: "11:55-16:00",
          category: "Теннис",
          image: "live-1.png",
        },
        {
          id: 2,
          title: "«Джиро д'Италия»",
          subTitle: "«Ролан Гаррос» | Мужчины. Третий круг",
          time: "14:07-17:44",
          category: "Велоспорт",
          image: "live-2.png",
        },
        {
          id: 3,
          title: "Британский кузовной",
          subTitle: "Донингтон",
          time: "12:54-20:30",
          category: "Супербайк",
          image: "live-3.png",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.content-grid {
  height: 530px;
  gap: 40px;
  overflow-x: scroll;
}
</style>
