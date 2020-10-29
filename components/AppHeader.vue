<template>
  <header id="app-header">
    <div class="content-wrapper d-flex align-center justify-between">
      <nuxt-link class="logo" :to="localePath('/')">OСпорте</nuxt-link>
      <nav class="navigation d-flex">
        <nuxt-link
          v-for="item in items"
          :key="item.link"
          :to="localePath(item.link)"
          class="nav-link"
          active-class="nav-link_active"
        >
          <div class="d-flex align-center">
            <point v-if="item.live" size="9px" class="mr-1" />
            {{ $t(item.name) }}
          </div>
        </nuxt-link>
        <icon
          name="search"
          alt="search-icon"
          size="18px"
          clickable
          class="ml-16"
        />
      </nav>
      <div class="language-wrapper">
        <nuxt-link
          :to="switchLocalePath('ru')"
          class="nav-link"
          :class="{
            'nav-link_active': locale == 'ru',
          }"
        >
          Рус
        </nuxt-link>
        <nuxt-link
          :to="switchLocalePath('kz')"
          class="nav-link"
          :class="{
            'nav-link_active': locale == 'kz',
          }"
        >
          Каз
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      items: [
        {
          name: "links.football",
          link: "/footbal",
        },
        {
          name: "links.hockey",
          link: "/hockey",
        },
        {
          name: "links.boxing",
          link: "/boxing",
        },
        {
          name: "links.forecasts",
          link: "/forecasts",
        },
        {
          name: "links.interview",
          link: "/interview",
        },
        {
          name: "links.cybersport",
          link: "/cybersport",
        },
        {
          name: "links.live",
          link: "/live",
          live: true,
        },
      ],
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
};
</script>

<style lang="scss" scoped>
#app-header {
  height: 110px;
  background-color: $colorHeader;
}

.logo {
  font-family: Proxima Nova;
  font-style: italic;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;

  text-decoration: none;
  color: $colorWhite;

  margin-right: 28px;

  &::first-letter {
    color: #eb5757;
  }
}

.nav-link {
  text-decoration: none;
  color: $colorWhite;

  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-left: 28px;

  &_active {
    color: $colorTag;
  }
}
</style>
