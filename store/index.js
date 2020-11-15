import { getTitleImage } from "@/utils";

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
  async fetchCategories(_, posts) {
    const { $axios } = window.$nuxt.context;
    const targetCategories = posts.reduce(
      (acc, curr) => [...acc, ...curr.categories],
      []
    );
    const { data } = await $axios.get(
      `/categories?_fields=id,name&include=${targetCategories}`
    );
    return data;
  },
  async fetchMedias(_, posts) {
    const { $axios } = window.$nuxt.context;
    const targetMedias = posts.reduce(
      (acc, curr) => [...acc, curr.featured_media],
      []
    );

    const { data } = await $axios.get(
      `/media?_fields=id,guid,alt_text&include=${targetMedias}`
    );
    return data;
  },
  async fetchPopular({ dispatch }, { limit } = { limit: 3 }) {
    const { $axios } = window.$nuxt.context;
    const { data: posts } = await $axios.get(
      `/posts?per_page=${limit}&_fields=date,slug,title,categories,featured_media,excerpt&order=asc`
    );

    const categories = await dispatch("fetchCategories", posts);
    const medias = await dispatch("fetchMedias", posts);

    return posts.map((post) => ({
      ...post,
      media: medias.find((m) => m.id === post.featured_media),
      category: categories.find((c) => post.categories.includes(c.id)).name,
    }));
  },
  async fetchExclusive({ dispatch }) {
    const { $axios } = window.$nuxt.context;
    const { data: posts } = await $axios.get(
      `/posts?_fields=date,slug,title,categories,featured_media,excerpt&order=asc&categories=18`
    );

    const categories = await dispatch("fetchCategories", posts);
    const medias = await dispatch("fetchMedias", posts);

    return posts.map((post) => ({
      ...post,
      media: medias.find((m) => m.id === post.featured_media),
      category: categories.find((c) => post.categories.includes(c.id)).name,
    }));
  },
  async fetchSearchCategories() {
    const { $axios } = window.$nuxt.context;
    const { data } = await $axios.get(`/categories?_fields=id,slug&exclude=1`);
    return data;
  },
  async searchPosts(_, query) {
    const { $axios } = window.$nuxt.context;
    const { data } = await $axios.get(
      `/posts?per_page=12&_fields=id,date,slug,title,content,excerpt,_embedded,_links&_embed=wp:term, wp:featuredmedia&search=${query}`
    );
    return data.map((item) => ({
      id: item.id,
      date: item.date,
      slug: item.slug,
      title: item.title.rendered,
      content: item.content.rendered,
      excerpt: item.excerpt.rendered,
      image: item._embedded["wp:featuredmedia"]
        ? {
            link: getTitleImage(item._embedded["wp:featuredmedia"], "medium"),
            alt: item._embedded["wp:featuredmedia"][0].alt_text,
          }
        : undefined,
      category: {
        id: item._embedded["wp:term"][0][0].id,
        slug: item._embedded["wp:term"][0][0].slug,
      },
    }));
  },
};
