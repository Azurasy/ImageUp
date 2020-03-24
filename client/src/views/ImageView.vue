<template>
  <div v-if="data">
    <Header :title="data.title" />
    <!--img v-if="data.uuid" :src="'/img/' + data.uuid + data.file_ext" /-->
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
      data: null
    };
  },
  methods: {},
  created() {
    axios
      .get(`/api/imgdata/${this.$route.params.id}`)
      .then(res => {
        this.data = res.data.data;
        if (this.data) {
          let downloadingImage = new Image();
          downloadingImage.onload = function() {
            document.getElementById("vimage").src = this.src;
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
