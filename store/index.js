import { parsePost, parsePostFull } from "@/utils";

export const state = () => ({
  isSearching: false,
});

export const mutations = {
  toggleSearching(state) {
    state.isSearching = !state.isSearching;
    document.querySelector("#app").style.overflowY = this.isSearching
      ? "hidden"
      : "";
  },
};

export const actions = {
  async fetchPopular() {
    const { $axios } = window.$nuxt.context;

    const { data, headers } = await $axios.get(
      `/posts?per_page=3&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia&order=asc`
    );
    return {
      data: data.map(parsePostFull),
      total: Number.parseInt(headers["x-wp-total"]),
    };
  },
  async fetchExclusive() {
    const { $axios } = window.$nuxt.context;

    const { data, headers } = await $axios.get(
      `/posts?per_page=4&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia&order=asc&categories=18`
    );
    return {
      data: data.map(parsePost),
      total: Number.parseInt(headers["x-wp-total"]),
    };
  },
  async fetchNewsSection() {
    const { $axios } = window.$nuxt.context;

    const { data, headers } = await $axios.get(
      `/posts?per_page=8&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term,wp:featuredmedia`
    );
    return {
      data: data.map(parsePost),
      total: Number.parseInt(headers["x-wp-total"]),
    };
  },
  async fetchSearchCategories() {
    const { $axios } = window.$nuxt.context;
    const { data } = await $axios.get(`/categories?_fields=id,slug&exclude=1`);
    return data;
  },
  async searchPosts(_, { query, category, page }) {
    const { $axios } = window.$nuxt.context;
    try {
      const { data, headers } = await $axios.get(
        `/posts?per_page=12&page=${page}&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term, wp:featuredmedia&${
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
};
