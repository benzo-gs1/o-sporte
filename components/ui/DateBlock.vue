<template>
  <span class="date">
    {{ parsed }}
  </span>
</template>

<script>
import moment from "moment";

export default {
  name: "DateBlock",
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    parsed() {
      const date = moment(this.date);
      const currentDate = moment();
      const diff = date.diff(currentDate, "days");
      if (diff === 0) {
        return this.$t("time.today");
      } else if (diff === -1) {
        return this.$t("time.yesterday");
      }

      if (date.year() !== currentDate.year()) {
        return moment(this.date).format("DD MMMM YYYY");
      }
      return moment(this.date).format("DD MMMM");
    },
  },
};
</script>

<style lang="scss" scoped></style>
