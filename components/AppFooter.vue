<template>
  <footer id="app-footer">
    <div class="content-wrapper d-flex align-center justify-between">
      <div class="navigation-wrapper">
        <h2 class="nav-title mb-4">{{ $t("links.title") }}</h2>
        <nav class="navigation d-flex">
          <div class="first mr-16 d-flex flex-column">
            <nuxt-link
              v-for="item in items.first"
              :key="item.link"
              :to="localePath(item.link)"
              class="nav-link mb-2"
            >
              {{ $t(item.name) }}
            </nuxt-link>
          </div>
          <div class="second d-flex flex-column">
            <nuxt-link
              v-for="item in items.second"
              :key="item.link"
              :to="localePath(item.link)"
              class="nav-link mb-2"
            >
              <div class="d-flex align-center">
                {{ $t(item.name) }}
                <point
                  v-if="item.live"
                  color="var(--color-tag)"
                  size="14px"
                  class="ml-2 mt-1"
                />
              </div>
            </nuxt-link>
          </div>
        </nav>
      </div>
      <div
        class="logo-wrapper d-flex flex-column justify-between text-center full-height py-4"
      >
        <div role="hidden"></div>
        <nuxt-link class="logo" :to="localePath('/')">
          <img src="@/assets/logo.png" alt="logo" />
        </nuxt-link>
        <p class="copyright">&copy; {{ $t("footer.copyright") }}</p>
      </div>
      <div class="social-wrapper">
        <!-- <div class="adds adds-placeholder" style="height: 80px"></div> -->
        <p v-if="icons.length" class="social-title mt-2">
          {{ $t("footer.social") }}
        </p>
        <div class="icons-wrapper d-flex">
          <icon
            v-for="icon in icons"
            :key="icon.name"
            :name="icon.name"
            :alt="icon.name + '-social-icon'"
            size="35px"
            clickable
            class="ml-6 mt-4"
            :link="icon.link"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      items: {
        first: [
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
            name: "links.cybersport",
            link: "/search?category=17&page=1",
          },
        ],
        second: [
          {
            name: "links.news",
            link: "/news",
          },
          {
            name: "links.interview",
            link: "/search?category=1&page=1",
          },
          {
            name: "links.forecasts",
            link: "/search?category=15&page=1",
          },
          // {
          //   name: "links.live",
          //   link: "/live",
          //   live: true,
          // },
        ],
      },
      icons: [
        // { name: "facebook", link: "#" },
        // { name: "vk", link: "#" },
        // { name: "instagram", link: "#" },
        // { name: "twitter", link: "#" },
        // { name: "telegram", link: "#" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#app-footer {
  $height: 350px;
  height: $height;
  min-height: $height;
  max-height: $height;

  margin-top: 40px;
  background-color: black;
}
.content-wrapper {
  & > * {
    flex: 1;
  }
}

.nav-title {
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: 0em;
  color: $colorWhite;
}

.nav-link {
  text-decoration: none;
  color: $colorWhite;

  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
}
.copyright {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;

  color: $colorWhite;
}
.logo {
  img {
    width: 60%;
  }
  // padding: 5em;
}
.social-title {
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: right;

  color: $colorLightGray;
}

@media (max-width: $bpTabletMax) {
  #app-footer {
    $height: 475px;
    height: $height;
    min-height: $height;
    max-height: $height;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
  .navigation-wrapper {
    grid-row: 1 / 3;
    .navigation {
      flex-direction: column;
    }
  }
  .logo-wrapper {
    align-items: center;
  }
  .social-wrapper {
    justify-self: flex-end;
    grid-row: 1 / 2;
  }
}
@media (max-width: $bpMobileMax + 100px) {
  #app-footer {
    $height: 630px;
    height: $height;
    min-height: $height;
    max-height: $height;
  }
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  .navigation-wrapper {
    grid-row: 1 / 2;
  }
  .social-wrapper {
    grid-row: 2 / 3;
  }
  .social-title {
    font-size: 16px;
  }
}
</style>
