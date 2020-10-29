<template>
  <section :id="name" class="article-section">
    <h2 class="h2 mt-10 mb-8 d-flex align-center">
      {{ $t(name) }}
      <point
        v-if="live"
        size="22px"
        color="var(--color-tag)"
        class="ml-2"
        style="margin-top: 2px"
      />
    </h2>
    <slot />
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
    live: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
