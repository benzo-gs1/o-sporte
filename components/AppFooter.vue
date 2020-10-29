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
                  class="ml-2"
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
          <point
            size="25px"
            height="29px"
            color="#EB5757"
            style="transform: rotate(24.4deg)"
          />
          Спорте
        </nuxt-link>
        <p class="copyright">&copy;{{ $t("footer.copyright") }}</p>
      </div>
      <div class="social-wrapper">
        <div class="adds adds-placeholder" style="height: 80px"></div>
        <p class="social-title mt-2">
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
            name: "links.cybersport",
            link: "/cybersport",
          },
        ],
        second: [
          {
            name: "links.news",
            link: "/news",
          },
          {
            name: "links.interview",
            link: "/interview",
          },
          {
            name: "links.forecasts",
            link: "/forecasts",
          },
          {
            name: "links.live",
            link: "/live",
            live: true,
          },
        ],
      },
      icons: [
        { name: "facebook", link: "#" },
        { name: "vk", link: "#" },
        { name: "instagram", link: "#" },
        { name: "twitter", link: "#" },
        { name: "telegram", link: "#" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#app-footer {
  height: 350px;
  background-color: black;
}
.nav-title {
  font-family: Proxima Nova;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: $colorWhite;
}

.nav-link {
  text-decoration: none;
  color: $colorWhite;

  font-family: Proxima Nova;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
}

.logo {
  font-family: Proxima Nova;
  font-size: 48px;
  font-style: italic;
  font-weight: 700;
  line-height: 58px;
  letter-spacing: 0em;

  text-decoration: none;
  color: $colorWhite;
}
.copyright {
  font-family: Proxima Nova;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;

  color: $colorWhite;
}
.social-title {
  font-family: Proxima Nova;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: right;

  color: $colorLightGray;
}
</style>
