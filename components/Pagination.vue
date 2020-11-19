<template>
  <div class="pagination d-flex justify-center align-center">
    <icon
      class="mr-3 mt-1"
      name="back"
      alt="back-icon"
      width="16px"
      height="28px"
      clickable
      @click.native="moveBack"
    />
    <div
      v-for="(item, index) in range"
      :key="index"
      class="block mr-3 d-flex align-center justify-center clickable"
      :class="{
        block_active: isActive(item),
        block_disabled: item === '...',
      }"
      @click="changePage(item)"
    >
      {{ item }}
    </div>
    <icon
      class="mt-1"
      name="next"
      alt="next-icon"
      width="16px"
      height="28px"
      clickable
      @click.native="moveNext"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  computed: {
    range() {
      const result = Array.from(Array(this.pages), (_, i) => i + 1);
      const diffLeft = this.page - 1;
      const diffRight = this.pages - this.page;
      // debugger;
      if (diffLeft > 3) {
        result.splice(1, diffLeft - 2, "...");
      }
      if (diffRight > 3) {
        const index = result.indexOf(this.pages);
        result.splice(index - diffRight + 2, diffRight - 2, "...");
      }
      return result;
    },
    pages() {
      return Math.ceil(this.total / 12);
    },
  },
  methods: {
    isActive(page) {
      return this.page === page;
    },
    changePage(page) {
      if (page === "...") return;
      this.$emit("page-change", page);
    },
    moveNext() {
      if (this.page + 1 <= this.total) {
        this.changePage(this.page + 1);
      }
    },
    moveBack() {
      if (this.page - 1 >= 1) {
        this.changePage(this.page - 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;

  width: 45px;
  height: 45px;

  border: 1px solid #a1a1a1;
  border-radius: 3px;

  transition: 0.2s all ease-in-out;

  &:hover,
  &_active {
    color: white;
    background-color: $colorHeader;
  }

  &_disabled:hover {
    cursor: not-allowed;
    background-color: white;
  }
}
</style>
