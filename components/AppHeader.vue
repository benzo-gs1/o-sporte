<template>
  <header id="app-header">
    <div class="content-wrapper d-flex align-center justify-between">
      <nuxt-link class="logo" :to="localePath('/')">ОСпорте</nuxt-link>
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
          @click.native="isSearching = !isSearching"
        />
      </nav>
      <nav class="mobile-nav">
        <div class="burger clickable">
          <div class="mb-1"></div>
          <div class="mb-1"></div>
          <div></div>
        </div>
      </nav>
      <div class="language-wrapper">
        <!-- <nuxt-link
          :to="switchLocalePath('ru')"
          class="nav-link"
          :class="{
            'nav-link_active': locale == 'ru',
          }"
        >
          Рус
        </nuxt-link> -->
        <!-- <nuxt-link
          :to="switchLocalePath('kz')"
          class="nav-link"
          :class="{
            'nav-link_active': locale == 'kz',
          }"
        >
          Каз
        </nuxt-link> -->
      </div>
    </div>
    <div v-show="isSearching" class="overlay search-block">
      <div class="wrapper content-wrapper">
        <input type="text" />
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
      isSearching: false,
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
  z-index: 2;
  position: relative;
}

.search-block {
  z-index: 1;
  background-color: rgba($color: #000000, $alpha: 0.9);
  top: 80%;
  height: 100vh;
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

.mobile-nav {
  display: none;
  .burger {
    width: 45px;
    height: 20px;

    div {
      background-color: white;
      height: 4px;

      &:nth-child(2) {
        width: 35px;
      }
      &:nth-child(3) {
        width: 25px;
      }
    }
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
@media (max-width: $bpTabletMax) {
  .navigation,
  .language-wrapper {
    display: none;
  }
  .mobile-nav {
    display: block;
  }
}
@media (max-width: $bpTabletMin) {
}
</style>
