<template>
  <div v-if="data">
    <Header :title="data.title" />
    <img v-if="data" :src="'/img/' + data.uuid + data.file_ext" />
  </div>
</template>

<script>
import axios from "axios";

import Header from "../components/Header";

export default {
  name: "ImageView",
  components: {
    Header
  },
  data: function() {
    return {
      data: null
    };
  },
  methods: {},
  created() {
    axios
      .get(`/api/imgdata/${this.$route.params.id}`)
      .then(res => {
        this.data = res.data.data;
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
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

<style scoped>
img {
  max-width: 90%;
  padding-bottom: 35px;
}
</style>
