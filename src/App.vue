<template>
  <div id="app" style="padding-left: 50px;">
    <NavBar />
    <div :class="['view', this.$store.getters.theme]">
      <div class="header">{{header()}}</div>
      <router-view />
    </div>
    
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
let body = document.getElementById("body");
body.classList.add("light");

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
          return "404 Page Not Found";
      }
    }
  },
  computed: {
    theme() {
      return this.$store.getters.theme;
    }
  },
  watch: {
    theme(newT, oldT) {
      body.classList.remove(oldT);
      body.classList.add(newT);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Itim&display=swap');

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
}

body.dark, view.dark {
  background-color: #35353e;
  color: rgb(197, 197, 197);
}

body.light, view.light {
  background-color: white;
  color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}

.header {
  max-width: 100%;
  height: 110px;
  font-size: 4em;
  padding-top: 30px;
  font-weight: bold;
  font-family: 'Itim', cursive;
}

.view {
  max-width: 960px;
  height: 100%;
  margin: auto;
  box-shadow: 0px 0px 145px -97px rgba(0,0,0,0.75);
}
</style>
