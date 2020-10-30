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
};
