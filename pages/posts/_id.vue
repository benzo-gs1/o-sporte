<template>
  <div id="article" class="content-wrapper">
    <main class="article content-grid mt-16">
      <div class="article-header content-grid">
        <div class="title-image">
          <img v-if="post.image" :src="post.image.link" :alt="post.image.alt" />
        </div>
        <h1 class="title">
          <div class="tags d-flex">
            <div v-for="tag in post.tags" :key="tag.id" class="tag mr-3">
              {{ tag.name }}
            </div>
          </div>
          <span>{{ post.title }}</span>
        </h1>
        <div class="time-wrapper mt-2">
          <date-block class="date" :date="post.date"></date-block>
        </div>
      </div>
      <div class="desktop-social-wrapper">
        <div class="inner-wrapper d-flex flex-column align-start pl-1">
          <icon
            v-for="icon in socials"
            :key="icon.name"
            :name="icon.name"
            :alt="icon.name + '-social-icon'"
            size="30px"
            clickable
            :link="icon.link"
            class="mb-3"
            blank
          />
        </div>
      </div>
      <div class="article-content d-flex flex-column">
        <div v-if="sections.length" class="table-of-contents">
          <div
            class="contents-header-wrapper d-flex justify-between align-center"
          >
            <h5 class="h5">Содержание статьи</h5>
            <span class="clickable" @click="sectionShow = !sectionShow">
              скрыть
            </span>
          </div>
          <transition name="contents">
            <ul v-if="sectionShow && sections.length" class="sections">
              <li
                v-for="(section, index) in sections"
                :key="index"
                class="mb-4"
              >
                <a class="section-link" :href="section.link">{{
                  section.name
                }}</a>
              </li>
            </ul>
          </transition>
        </div>
        <div class="main-content" v-html="content">
          <!-- content -->
        </div>
        <div class="last-element tags tags_article d-flex">
          <div
            v-for="tag in post.tags"
            :key="'sub-tag-' + tag.id"
            class="tag mr-3"
          >
            {{ tag.name }}
          </div>
        </div>
        <div class="author-card d-flex">
          <div class="author-text-wrapper d-flex flex-column">
            <span class="author-title my-3">Автор</span>
            <span class="author-name">{{ post.author }}</span>
          </div>
        </div>
        <div class="social-share mt-4 mb-8">
          <h5 class="social-share-title mb-5">Поделится</h5>
          <div class="icons-wrapper d-flex mb-5">
            <icon
              v-for="icon in socials"
              :key="'sub-icon-' + icon.name"
              :name="icon.name"
              :alt="icon.name + '-social-icon'"
              size="50px"
              clickable
              :link="icon.link"
              blank
            />
          </div>
        </div>
      </div>
      <article-exclusives class="exclusives"></article-exclusives>
    </main>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ArticleExclusives from "@/components/article/ArticleExclsusives";

export default {
  name: "Post",
  components: {
    ArticleExclusives,
  },
  async asyncData({ params, store }) {
    const id = params.id;
    const post = await store.dispatch("fetchPost", id);
    return {
      post,
    };
  },
  data() {
    return {
      sectionShow: true,
    };
  },
  computed: {
    socials() {
      const url = "https://1sport.kz/posts/" + this.post.slug;
      return [
        {
          name: "facebook_black",
          link: `https://www.facebook.com/dialog/share?app_id=87741124305&href=${url}&display=popup`,
        },
        {
          name: "vk_black",
          link: `https://vk.com/share.php?url=${url}`,
        },
        {
          name: "twitter_black",
          link: `https://twitter.com/intent/tweet?url=${url}&text=${this.metaTitle}&related=Sport`,
        },
        {
          name: "telegram_black",
          link: `https://telegram.me/share/url?url=${url}&text=${this.metaTitle}`,
        },
      ];
    },
    sections() {
      const match = [...this.post.content.matchAll(/<h2>(.*?)<\/h2>/gi)];
      return match
        .map((item) => item[1])
        .map((item) => {
          const parsed = item.includes(";")
            ? item.substring(0, item.indexOf("&"))
            : item;
          return {
            name: parsed,
            link: "#" + parsed,
          };
        });
    },
    categories() {
      return this.post.categories?.map((item) => item.slug) ?? [];
    },
    tags() {
      return this.post.tags?.map((item) => item.name) ?? [];
    },
    metaTitle() {
      if (this.post.meta.title) {
        return this.post.meta.title;
      }
      return this.post.title;
    },
    metaKeywords() {
      if (this.post.meta.keywords) {
        return this.post.meta.keywords;
      }
      return [...this.tags, ...this.categories].join(",").toLowerCase();
    },
    metaDescription() {
      if (this.post.meta.description) {
        return this.post.meta.description;
      }
      return this.post.excerpt?.replace("<p>", "").replace("</p>", "");
    },
    metaImage() {
      return this.post.image?.link;
    },
    content() {
      let temp = this.post.content;
      const matches = [...this.post.content.matchAll(/<h2>(.*?)<\/h2>/gi)];
      const sections = this.sections;
      matches.forEach((match, i) => {
        const section = sections[i];
        const parsed = match[0].replace("<h2>", `<h2 id="${section.name}">`);
        temp = temp.replace(match[0], parsed);
      });
      return temp;
    },
  },
  created() {
    if (this.$store.state.isSearching) {
      this.toggleSearching();
    }

    if (!this.post) {
      return this.$nuxt.error({ statusCode: 404 });
    }
  },
  methods: {
    ...mapMutations(["toggleSearching"]),
  },
  head() {
    return {
      title: this.metaTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.metaKeywords,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.metaTitle,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.metaDescription,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.metaImage,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.metaTitle,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.metaTitle,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.metaDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.metaImage,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.metaImage,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.metaTitle,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/_wp";
</style>
