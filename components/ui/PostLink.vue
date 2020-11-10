<template>
  <nuxt-link :to="path">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  computed: {
    path() {
      return "/posts/" + this.link;
    },
  },
};
</script>
