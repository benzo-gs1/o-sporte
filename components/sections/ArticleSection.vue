<template>
  <section :id="name" class="article-section">
    <h2 class="h2 mt-10 mb-8">{{ $t(name) }}</h2>
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "ArticleSection",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
</style>
