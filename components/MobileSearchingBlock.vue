<template>
  <div
    id="mobile-searching-block"
    class="searching-block"
    :class="{
      'searching-block_active': isActive,
    }"
  >
    <div class="input-wrapper mt-2">
      <div class="content-wrapper">
        <icon
          class="search-icon"
          name="search-bar"
          alt="search-icon"
          size="20px"
          clickable
          @click.native="search"
        />
        <input
          v-model="query"
          class="search-bar"
          type="text"
          :placeholder="$t('search')"
          @keydown.enter="search"
        />
        <icon
          class="exit-icon"
          name="exit"
          alt="exit-icon"
          size="16px"
          clickable
          @click.native="exit"
        />
      </div>
      <div class="content-wrapper categories py-8 d-flex">
        <nuxt-link
          v-for="category in parsedCategories"
          :key="category.id"
          class="category"
          :to="localePath(categoryLink(category.id))"
        >
          {{ $t(category.name) }}
        </nuxt-link>
      </div>
    </div>
    <template v-if="!posts">
      <div class="content-wrapper no-data my-8" @click="dropPosts">
        {{ $t("no-data") }}
      </div>
    </template>
    <template v-else>
      <div class="search-items content-wrapper content-grid my-8">
        <template v-if="!loading">
          <image-search-block
            v-for="post in imagePosts"
            :key="post.id"
            :post="post"
          >
          </image-search-block>
          <imageless-search-block
            v-for="post in imagelessPosts"
            :key="post.id"
            :post="post"
          >
          </imageless-search-block>
        </template>
        <template v-else>
          <loading-image-search-block
            v-for="i in [1, 2, 3, 4]"
            :key="i"
          ></loading-image-search-block>
        </template>
        <div class="spacer"></div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import debounce from "lodash.debounce";

export default {
  name: "SearchingBlock",
  fetchOnServer: false,
  async fetch() {
    this.categories = await this.fetchSearchCategories();
  },
  data() {
    return {
      query: "",
      categories: [],
      posts: [],
      loading: false,
    };
  },
  computed: {
    ...mapState(["isSearching"]),
    parsedCategories() {
      const parsed = this.categories
        .map((item) => ({
          ...item,
          name: "categories." + item.slug,
        }))
        .filter((item) => {
          const translation = this.$t(item.name);
          return item.name !== translation;
        });
      return parsed;
    },
    imagePosts() {
      return this.posts?.filter((post) => post.image);
    },
    imagelessPosts() {
      return this.posts?.filter((post) => !post.image);
    },
    isActive() {
      return this.query || !this.posts || this.posts.length;
    },
  },
  watch: {
    query: "fetchPosts",
  },
  methods: {
    ...mapActions(["fetchSearchCategories", "searchPosts"]),
    ...mapMutations(["toggleSearching"]),
    exit() {
      if (this.query) {
        this.query = "";
      } else {
        this.dropPosts();
      }
    },
    search() {
      if (!this.query) return;
      this.$router.push({
        path: "/search",
        query: {
          query: this.query,
          page: 1,
        },
      });
    },
    categoryLink(id) {
      return {
        path: "/search",
        query: {
          category: id,
        },
      };
    },
    fetchPosts: debounce(async function () {
      if (this.query.length <= 1) return;
      this.loading = true;
      const { data, total } = await this.searchPosts({
        query: this.query,
        page: 1,
      });
      this.posts = total ? data : false;
      this.loading = false;
    }, 600),
    dropPosts() {
      this.posts = [];
      this.query = "";
    },
  },
};
</script>

<style lang="scss" scoped>
#mobile-searching-block {
  @extend .overlay;

  top: 74px;
  min-height: calc(100vh - 75px);
  z-index: 1;
  padding-bottom: 32px;
}
.searching-block {
  pointer-events: none;
  overflow-y: hidden;
}
.searching-block_active {
  background: rgba(33, 33, 33, 0.9);
  pointer-events: all;
  overflow-y: auto;
}
.content-wrapper {
  position: relative;
}
.input-wrapper {
  background-color: $colorHeader;
  pointer-events: all;
}
.categories {
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.search-icon,
.exit-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
}
.exit-icon {
  right: 0px;
}

.search-bar {
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid $colorLightGray;
  padding: 14px 40px;
  width: 100%;

  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
}

.category {
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;

  color: white;
  border: 1px solid $colorLightGray;

  margin-right: 15px;
  padding: 4px 10px;
}

.no-data {
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  color: white;
}

.content-grid {
  gap: 40px;
  grid-auto-rows: min-content;
  min-height: 100%;
}
.spacer {
  grid-column: span 8;
  height: 32px;
}

@media (max-width: $bpDesktopMin) {
  .exit-icon {
    right: 20px;
  }
}
</style>
