import { parsePost, parsePostFull, parsePostArticle } from "@/utils";

export const state = () => ({
  isSearching: false,
});

export const mutations = {
  toggleSearching(state) {
    state.isSearching = !state.isSearching;

    if (process.client) {
      document.querySelector("#app").style.overflowY = state.isSearching
        ? "hidden"
        : "";
    }
  },
};

export const actions = {
  async fetchPopular() {
    const { data, headers } = await this.$axios.get(
      `/posts?per_page=3&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia,author&order=asc&categories=36`
    );
    return {
      data: data.map(parsePostFull),
      total: Number.parseInt(headers["x-wp-total"]),
    };
  },
  async fetchExclusive() {
    const { data, headers } = await this.$axios.get(
      `/posts?per_page=4&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia,author&order=asc&categories=18`
    );
    return {
      data: data.map(parsePostFull),
      total: Number.parseInt(headers["x-wp-total"]),
    };
  },
  async fetchNewsSection(_, page = 1) {
    const { data, headers } = await this.$axios.get(
      `/posts?per_page=8&page=${page}&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia,author`
    );
    return {
      data: data.map(parsePost),
      total: Number.parseInt(headers["x-wp-totalpages"]),
    };
  },
  async fetchSearchCategories() {
    const { data } = await this.$axios.get(
      `/categories?_fields=id,slug&exclude=1`
    );
    return data;
  },
  async searchPosts(_, { query, category, page }) {
    try {
      const { data, headers } = await this.$axios.get(
        `/posts?per_page=12&page=${page}&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term, wp:featuredmedia,author&${
          query ? `search=${query}` : `categories=${category}`
        }`
      );
      return {
        data: data.map(parsePost),
        total: Number.parseInt(headers["x-wp-total"]),
      };
    } catch (error) {
      return {
        data: [],
        total: 0,
      };
    }
  },
  async fetchPosts() {
    const { data } = await this.$axios.get(`/posts?&_fields=id,slug`);
    return data;
  },
  async fetchPost(_, slug) {
    const { data } = await this.$axios.get(
      `/posts?_fields=id,date,slug,title,content,excerpt,_embedded,_links,acf&_embed=wp:term, wp:featuredmedia,author&slug=${slug}`
    );
    const post = data[0];
    if (post) return parsePostArticle(post);
    return false;
  },
  async fetchPostExclusives() {
    const { data, headers } = await this.$axios.get(
      `/posts?per_page=4&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia,author&order=asc&categories=18`
    );
    return {
      data: data.map(parsePost),
      total: Number.parseInt(headers["x-wp-total"]),
    };
  },
};
