<template>
  <div id="app">
    <NavBar />
    <div :class="['view', this.$store.getters.theme]">
      <div :class="['page', this.$store.getters.theme]">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  methods: {
    header() {
      switch (this.$route.path) {
        case "/":
          return "Carbon Copy";
        case "/upload":
          return "Upload";
        default:
          return "Page Not Found";
      }
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Itim";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local("Itim"), local("Itim-Regular"),
    url("./assets/fonts/item.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-weight: bold;
  font-family: "Itim";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.view {
  height: 100%;
  padding-left: 50px;
  background-color: white;
  color: #2c3e50;
}
@media screen and (max-width: 430px) {
  .view {
    padding-left: 0;
    padding-top: 50px;
  }
}

.view.dark {
  background-color: #333940; /* #35353e; */
  color: rgb(197, 197, 197);
}

.page {
  max-width: 940px;
  height: 100%;
  margin: auto;
  background-color: white;
  box-shadow: -1px 0px 300px -32px rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  padding: 0 10px;
}

.page.dark {
  background-color: #333940;
  box-shadow: -1px 0px 300px -32px rgba(0, 0, 0, 0.3);
}
</style>
