export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  computed: {
    parsedTitle() {
      if (this.title.length > 70) {
        return this.title.slice(0, 67) + "...";
      }
      return this.title;
    },
  },
};
