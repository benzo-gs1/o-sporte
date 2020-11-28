<template>
  <article class="exclusive-block d-flex flex-column pa-7">
    <div class="category mb-2">loremipsum</div>
    <div class="h6">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum, velit.
      Lorem, ipsum
    </div>
    <div class="date sub-header mt-4">2020 01 01</div>
    <div class="image overlay"></div>
  </article>
</template>

<script>
export default {
  name: "LoadingExclusiveBlock",
};
</script>

<style lang="scss" scoped>
.exclusive-block {
  position: relative;
  justify-content: flex-end;
  overflow: hidden;

  min-width: 270px;
  width: 270px;
  height: 415px;
  border-radius: 15px;
  margin-right: 40px;
  transform: translateX(20px);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;

  &::after {
    @extend .overlay;
    z-index: 0;
    background-color: $colorLoader;
  }
}
.category {
  align-self: flex-start;
}
.h6,
.category,
.date {
  @extend .loader;
}
</style>
