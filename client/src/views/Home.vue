<template>
  <div class="home">
    <Header title="ImageUp" />
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    Header
  },
  watch: {
    "$store.getters.reload": function(val) {
      if (val) {
        this.$store.dispatch("setReload", false);
      }
    }
  }
};
</script>
