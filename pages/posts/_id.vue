<template>
  <div class="content-wrapper">
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
        <div class="time-wrapper">
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
        <!-- <p
          v-if="!post.excerpt.includes('[&hellip;]')"
          class="description content-header"
        ></p> -->
        <!-- content -->
        <div class="last-element tags tags_article d-flex">
          <div v-for="tag in post.tags" :key="tag.id" class="tag mr-3">
            {{ tag.name }}
          </div>
        </div>
        <div class="author-card mt-14 d-flex">
          <icon class="mr-7" name="avatar" alt="author-icon" size="126px" />
          <div class="author-text-wrapper d-flex flex-column">
            <span class="author-title my-3">Автор</span>
            <span class="author-name">{{ post.author }}</span>
          </div>
        </div>
        <div class="social-share mt-15 mb-8">
          <h5 class="social-share-title mb-5">Поделится</h5>
          <div class="icons-wrapper d-flex mb-5">
            <icon
              v-for="icon in socials"
              :key="icon.name"
              :name="icon.name"
              :alt="icon.name + '-social-icon'"
              size="50px"
              clickable
              :link="icon.link"
            />
          </div>
        </div>
        <section class="email mt-14 pa-6 d-flex flex-column align-center">
          <h4 class="email-title mb-14">Хочешь получить рассылку?</h4>
          <div class="input-wrapper d-flex">
            <input
              class="email-input"
              type="text"
              placeholder="Введите email"
            />
            <button class="email-button clickable">Отправить</button> <br />
          </div>
          <p class="clickable email-agreement mt-4 mb-8">
            Пользовательское соглашение
          </p>
        </section>
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
      socials: [
        { name: "facebook_black", link: "#" },
        { name: "vk_black", link: "#" },
        { name: "instagram_black", link: "#" },
        { name: "twitter_black", link: "#" },
        { name: "telegram_black", link: "#" },
      ],
      sectionShow: true,
    };
  },
  computed: {
    sections() {
      if (!process.client) return [];
      const container = document.createElement("div");
      container.innerHTML = this.post.content;
      const sections = [...container.querySelectorAll("h2")];
      return sections.map((section) => {
        const text = section.innerHTML;
        return {
          name: text.includes(";")
            ? text.substring(0, text.indexOf("&"))
            : text,
          link: "#" + section.innerHTML,
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
  },
  mounted() {
    this.buildContent();
    // this.buildDescription();
    document.querySelector("#app").scrollTop = 0;
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
    buildContent() {
      const container = document.createElement("div");
      const article = this.$el.querySelector(".article-content");
      const endNode = article.querySelector(".last-element");
      container.innerHTML = this.post.content;

      container.childNodes.forEach((node) => {
        if (node.nodeName === "#text") return;
        if (node.nodeName === "H2") {
          node.id = node.innerHTML;
          node.classList.add("content-header");
        }
        if (node.nodeName === "P") {
          node.classList.add("content-paragraph");
        }

        node.classList.add("content-element");
        article.insertBefore(node, endNode);
      });
    },
    // buildDescription() {
    //   const description = this.$el.querySelector(".description");

    //   if (!description) return;
    //   const container = document.createElement("div");
    //   container.innerHTML = this.post.excerpt;
    //   description.innerHTML = container.querySelector("p").innerHTML;
    // },
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
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.article {
  gap: 15px;
  height: auto;
}
.article-header {
  grid-column: span 8;
}
.article-content {
  grid-column: 3 / 7;

  & > * {
    margin-bottom: 30px;
  }
}
.title-image {
  grid-column: span 8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  overflow: hidden;
  max-height: 400px;
  margin-bottom: -80px;
}
.title {
  font-size: 58px;
  font-weight: 700;
  line-height: 76px;
  letter-spacing: 0em;
  span {
    background-color: $colorTag;
    padding: 0.1em 0.2em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  grid-column: 2 / 8;
}

.tags {
  flex-wrap: wrap;
}
.tag {
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  color: white;

  background: #282828;
  padding: 6px 30px;
}
.time-wrapper {
  grid-column: 2 / 8;

  .date {
    color: #7b7b7b;
  }
}
.desktop-social-wrapper {
  grid-column: 2 / 3;
  z-index: 0;
  .inner-wrapper {
    position: sticky;
    top: 50px;
  }
}
.table-of-contents {
  .contents-header-wrapper,
  .sections {
    background-color: #f0f0f0;
    padding: 20px 36px;
  }
  .sections {
    padding-top: 0px;
  }

  .section-link {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.015em;
  }
}
.exclusives {
  grid-column: 7 / 9;
}
.tags_article {
  grid-column: 3 / 7;
  margin-top: 20px;
}
.author-card {
  .author-text-wrapper {
    .author-title {
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;

      color: $colorGray;
    }
    .author-name {
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0em;
    }
  }
}
.social-share {
  display: none;
  background-color: $colorLightGray;
  padding: 10px;

  .social-share-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  .icons-wrapper {
    justify-content: space-between;
  }
}
.email {
  background-color: black;
  &-title {
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 0em;
    text-align: center;
    color: white;
  }
  .input-wrapper {
    align-self: flex-start;
  }
  &-input {
    flex: 1;

    font-size: 18px;
    padding: 26px 36px;
  }
  &-button {
    font-size: 26px;
    font-weight: 600;

    padding: 18px 26px;

    color: white;
    background-color: transparent;
    border: 1px solid white;
  }
  &-agreement {
    color: white;
    align-self: flex-start;
    font-size: 14px;
    font-weight: 600;
  }
}
.spacer {
  grid-column: span 8;
  height: 64px;
}

@media (max-width: $bpTabletMax) {
  .article-content {
    grid-column: span 8;
  }
  .title {
    grid-column: span 8;
    font-size: 48px;
    line-height: 70px;
  }
  .time-wrapper {
    grid-column: span 8;
  }

  .desktop-social-wrapper,
  .exclusives {
    display: none;
  }

  .table-of-contents,
  .social-share {
    max-width: 50%;
  }

  .social-share {
    display: block;
  }
}
@media (max-width: $bpTabletMin) {
  .tag {
    font-size: 13px;
    line-height: 16px;
  }
  .title {
    font-size: 38px;
    line-height: 50px;
  }
  .title-image {
    margin-bottom: -70px;
  }

  .table-of-contents,
  .social-share {
    max-width: 75%;
  }

  .email {
    &-title {
      font-size: 24px;
      line-height: 29px;
    }
    &-input {
      font-size: 18px;
    }
    &-button {
      font-size: 26px;
    }
  }
}
@media (max-width: $bpMobileMax + 100px) {
  .title {
    font-size: 28px;
    line-height: 38px;
  }
  .title-image {
    margin-bottom: -70px;
  }

  .table-of-contents,
  .social-share {
    max-width: none;
  }
  .social-share {
    &-title {
      display: none;
    }
    .icons-wrapper {
      margin-top: 20px;
    }
  }

  .email {
    &-input {
      font-size: 14px;
      padding: 16px 26px;
    }
    &-button {
      font-size: 16px;
      padding: 16px 26px;
    }
  }
}
@media (max-width: $bpMobileMax) {
  .email {
    &-title {
      font-size: 18px;
      line-height: 22px;
    }
    &-input {
      font-size: 12px;
      padding: 8px 14px;
    }
    &-button {
      font-size: 14px;
      padding: 8px 14px;
    }
  }
}
.contents-enter-active,
.contents-leave-active {
  transition: all 0.2s;
  max-height: 100%;
}
.contents-enter,
.contents-leave-to {
  opacity: 0;
  max-height: 0%;
}
</style>

<style lang="scss">
.content-element {
  margin-bottom: 15px;
}
.content-header {
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
}
.content-paragraph {
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
}
.wp-block-image {
  img {
    width: 100%;
    height: 100%;
  }

  // &.size-large {
  //   transform: translateX(-25%);
  //   img {
  //     width: auto;
  //     height: 100%;
  //   }
  // }
}
@media (max-width: $bpMobileMax + 100px) {
  .social-share {
    .icons-wrapper {
      img {
        width: 38px !important;
        height: 38px !important;
      }
    }
  }
}
</style>
