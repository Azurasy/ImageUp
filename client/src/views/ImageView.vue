<template>
  <div v-if="data">
    <Header :title="data.title" />
    <img v-if="!loaded" src="@/assets/images/loading.gif" />
    <img id="vimage" src="@/assets/images/blank.png" />
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
      data: null,
      loaded: false
    };
  },
  methods: {},
  created() {
    axios
      .get(`/api/img/data/${this.$route.params.id}`)
      .then(res => {
        this.data = res.data.data;
        if (this.data) {
          let downloadingImage = new Image();
          downloadingImage.onload = () => {
            document.getElementById("vimage").src = downloadingImage.src;
            this.loaded = true;
          };
          downloadingImage.src = `/img/${this.data.uuid}${this.data.file_ext}`;
        } else this.data = { title: "Image not found" };
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
  max-height: 70vh;
}
</style>
