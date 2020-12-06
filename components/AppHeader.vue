<template>
  <header id="app-header">
    <div class="content-wrapper d-flex align-center justify-between">
      <nuxt-link class="logo" :to="localePath('/')">
        <img src="@/assets/logo.png" alt="logo" />
      </nuxt-link>
      <nav class="navigation d-flex mt-2">
        <nuxt-link
          v-for="item in items"
          :key="item.link"
          :to="localePath(item.link)"
          class="nav-link"
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
          @click.native="toggle"
        />
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
      </nav>
      <nav class="mobile-nav">
        <div
          class="overlay"
          :class="{
            overlay_active: isSearching,
          }"
        ></div>
        <div class="burger clickable" @click="toggleMobile">
          <div class="mb-1"></div>
          <div class="mb-1"></div>
          <div></div>
        </div>
        <div
          class="burger-menu d-flex flex-column"
          :class="{
            'burger-menu_active': isSearching,
          }"
        >
          <div class="burger-header d-flex align-center justify-between px-5">
            <nuxt-link
              class="logo"
              :to="localePath('/')"
              @click.native="toggleMobile"
            >
              <img src="@/assets/logo.png" alt="logo" />
            </nuxt-link>
            <icon
              class="pt-2"
              name="exit_burger"
              alt="exit-burger-icon"
              size="45px"
              clickable
              @click.native="toggleMobile"
            />
          </div>
          <mobile-searching-block></mobile-searching-block>
          <div class="links">
            <template v-for="item in items">
              <nuxt-link
                :key="item.link"
                :to="localePath(item.link)"
                class="nav-link"
              >
                <div class="d-flex align-center">
                  <point v-if="item.live" size="9px" class="mr-1" />
                  {{ $t(item.name) }}
                </div>
              </nuxt-link>
              <hr :key="item.link + '_line'" class="hr" />
            </template>
          </div>
        </div>
      </nav>
    </div>
    <transition name="search">
      <searching-block v-show="isSearching" ref="searchBlock"></searching-block>
    </transition>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {
      items: [
        {
          name: "links.football",
          link: "/search?category=12&page=1",
        },
        {
          name: "links.hockey",
          link: "/search?category=13&page=1",
        },
        {
          name: "links.boxing",
          link: "/search?category=14&page=1",
        },
        {
          name: "links.forecasts",
          link: "/search?category=15&page=1",
        },
        {
          name: "links.interview",
          link: "/search?category=1&page=1",
        },
        {
          name: "links.cybersport",
          link: "/search?category=17&page=1",
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
    ...mapState(["isSearching"]),
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    ...mapMutations(["toggleSearching"]),
    toggle() {
      this.toggleSearching();
      this.$refs.searchBlock.dropPosts();
    },
    toggleMobile() {
      this.toggleSearching();
    },
  },
};
</script>

<style lang="scss" scoped>
#app-header {
  height: 75px;
  background-color: $colorHeader;
  z-index: 2;
  position: relative;
}

.logo {
  margin-right: 28px;
  height: 75px;
  padding: 16px;
  img {
    max-height: 100%;
    max-width: 100%;
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

  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  margin-left: 28px;
}
@media (max-width: $bpTabletMax) {
  .navigation,
  .language-wrapper {
    display: none;
  }
  .mobile-nav {
    display: block;
  }

  .mobile-nav {
    .burger-menu {
      position: fixed;
      height: 100vh;
      width: 75vw;
      top: 0;
      left: 0;
      background-color: $colorHeader;
      transition: 0.2s all ease;
      transform: translateX(150%);
      z-index: 2;

      &_active {
        transform: translateX(34%);
      }

      .logo {
        opacity: 0;
        z-index: -1;
      }
      .links {
        margin-top: 140px;

        .nav-link {
          font-size: 16px;
          line-height: 19px;
          letter-spacing: 0em;
          margin: 18px 36px;
          display: block;
        }
        .hr {
          border: 0.5px solid white;
        }
      }
    }
    .overlay {
      position: fixed;
      z-index: -1;
      background-color: rgba($color: #000000, $alpha: 0.7);
      opacity: 0;
      transition: 0.3s all ease-in-out;
      pointer-events: none;

      &_active {
        opacity: 1;
        z-index: 1;
        pointer-events: all;
      }
    }
  }
}
@media (max-width: $bpTabletMin) {
  .mobile-nav {
    .burger-menu {
      width: 100vw;
      transform: translateX(100%);

      &_active {
        transform: translateX(0%);
      }

      .logo {
        opacity: 1;
        z-index: 0;
      }
    }
    .overlay {
      display: none;
    }
  }
}
</style>
