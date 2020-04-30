<template>
  <div class="home">
    <Header title="ImageUp" />
    <!--button @click="btnClicked">Fetch</button-->

    <p class="home_heading">Recently Uploaded</p>
    <Gallery :user_id="0" />
  </div>
</template>

<script>
import Header from '../components/Header';
import Gallery from '../components/gallery/Gallery';

export default {
  name: 'Home',
  components: {
    Header,
    Gallery,
  },
  watch: {
    '$store.getters.reload': function(val) {
      if (val) {
        this.$store.dispatch('setReload', false);
      }
    },
    '$route.fullPath': function(val) {
      if (val === '/') this.resizeAll();
    },
  },
};
</script>

<style>
.home_heading {
  text-align: left;
  margin-top: 0;
  margin-left: 10px;
  font-family: comfortaa;
  font-size: 1.5em;
}
</style>
