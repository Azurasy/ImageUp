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
@import url("https://fonts.googleapis.com/css?family=Itim&display=swap");

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
  font-family: "Itim", cursive;
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
  max-width: 960px;
  height: 100%;
  margin: auto;
  background-color: white;
  box-shadow: -1px 0px 300px -32px rgba(0, 0, 0, 0.15);
  border-radius: 50px;
}

.page.dark {
  background-color: #333940;
  box-shadow: -1px 0px 300px -32px rgba(0, 0, 0, 0.3);
}
</style>
