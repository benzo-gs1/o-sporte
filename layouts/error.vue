<template>
  <div id="error-page" class="content-wrapper">
    <h2 class="h2 mt-10 mb-8 d-flex align-center">
      {{ error.statusCode }}
    </h2>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  layout: "default",
  props: {
    error: Object,
  },
  computed: {
    message() {
      if (this.error.statusCode === 404) return "Не найдено :(";
      return "Произошла ошибка";
    },
  },
  head() {
    return {
      title: this.message,
    };
  },
};
</script>

<style lang="scss" scoped></style>
