<template>
  <article class="article content-grid content-wrapper mt-16">
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
    <div class="desktop-social-wrapper d-flex flex-column">
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
    <div class="table-of-contents">
      <div class="contents-header-wrapper d-flex justify-between align-center">
        <h5 class="h5">Содержание статьи</h5>
        <span class="clickable" @click="sectionShow = !sectionShow">
          скрыть
        </span>
      </div>
      <ul v-if="sectionShow" class="sections">
        <li v-for="(section, index) in sections" :key="index" class="mb-4">
          <a class="section-link" :href="section.link">{{ section.name }}</a>
        </li>
      </ul>
    </div>
    <client-only>
      <article-exclusives class="exclusives"></article-exclusives>
      <p class="description" v-html="post.excerpt"></p>
    </client-only>
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
    <section class="comments">
      <p class="comments-title mb-6">0 комментариев</p>
      <hr class="comments-separator" />
      <p class="comments-title mt-6 mb-4">Добавить комментарий</p>
      <hr class="comments-separator" />
      <p class="comments-title mt-8">
        Для отправки комментария вам необходимо авторизоваться.
      </p>
    </section>
    <section class="email mt-14 pa-6 d-flex flex-column align-center">
      <h4 class="email-title mb-14">Хочешь получить рассылку?</h4>
      <div class="input-wrapper d-flex">
        <input class="email-input" type="text" placeholder="Введите email" />
        <button class="email-button clickable">Отправить</button> <br />
      </div>
      <p class="clickable email-agreement mt-4 mb-8">
        Пользовательское соглашение
      </p>
    </section>
    <div class="spacer"></div>
  </article>
</template>

<script>
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

      return sections.map((section) => ({
        name: section.innerHTML,
        link: "#" + section.innerHTML,
      }));
    },
  },
  mounted() {
    this.buildContent();
  },
  methods: {
    buildContent() {
      const container = document.createElement("div");
      const result = this.$el;
      const endNode = result.querySelector(".last-element");
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
        result.insertBefore(node, endNode);
      });
    },
  },
  head() {
    return {
      title: this.post.title,
    };
  },
};
</script>

<style lang="scss" scoped>
.article {
  gap: 15px;
}
.title-image {
  grid-column: span 8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  overflow: hidden;
  max-height: 550px;
  margin-bottom: -100px;
}
.title {
  font-family: Proxima Nova;
  font-size: 60px;
  font-weight: 700;
  line-height: 86px;
  letter-spacing: 0em;
  span {
    background-color: $colorTag;
  }

  grid-column: 2 / 8;
}

.tags {
  flex-wrap: wrap;
}
.tag {
  font-family: Proxima Nova;
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
  grid-column: 3 / 6;

  .section-link {
    font-family: Proxima Nova;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.015em;
  }
}
.exclusives {
  grid-column: 7 / 9;
  grid-row: span 10;
}
.description {
  font-family: Proxima Nova;
  font-size: 16px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;

  grid-column: 2 / 6;
}
.tags_article {
  grid-column: 3 / 7;
  margin-top: 20px;
}
.author-card {
  grid-column: 3 / 7;
  .author-text-wrapper {
    .author-title {
      font-family: Proxima Nova;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      letter-spacing: 0em;

      color: $colorGray;
    }
    .author-name {
      font-family: Proxima Nova;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0em;
    }
  }
}
.comments {
  grid-column: span 8;
  &-title {
    font-family: Proxima Nova;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    letter-spacing: 0em;
  }
  &-separator {
    border: 4px solid black;
  }
}
.email {
  grid-column: span 8;
  background-color: black;
  &-title {
    font-family: Proxima Nova;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 0em;
    text-align: center;
    color: white;
  }
  .input-wrapper {
    width: 70%;
  }
  &-input {
    flex: 1;
    font-family: Proxima Nova;
    font-size: 24px;
    padding: 26px 36px;
  }
  &-button {
    font-family: Proxima Nova;
    font-size: 36px;
    font-weight: 600;

    padding: 18px 26px;

    color: white;
    background-color: transparent;
    border: 1px solid white;
  }
  &-agreement {
    color: white;
    font-family: Proxima Nova;
    font-size: 14px;
    font-weight: 600;
    width: 70%;
  }
}
.spacer {
  grid-column: span 8;
  height: 64px;
}
</style>

<style lang="scss">
.content-element {
  grid-column: 3 / 7;
  padding-right: 10px;
}
.content-header {
  font-family: Proxima Nova;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
}
.content-paragraph {
  font-family: Proxima Nova;
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

  &.size-large {
    grid-column: 1 / 9;
  }
}
</style>
