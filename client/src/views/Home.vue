<template>
  <div class="home">
    <Header title="ImageUp" />
    <!--button @click="btnClicked">Fetch</button-->

    <p class="home_heading">
      Recently Uploaded
    </p>

    <!-- Credits for image gallary code: https://uicookies.com/css-image-galleries/ and https://codepen.io/vhanla/pen/PxjZvj -->
    <div class="gallery" id="gallery" ref="gallery">
      <ImageTile
        v-for="item in data"
        :key="item.uuid"
        :data="item"
        @image_loaded="resizeAll"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Header from "../components/Header";
import ImageTile from "../components/home/ImageTile";

export default {
  name: "Home",
  components: {
    Header,
    ImageTile
  },
  data: function() {
    return {
      index: -1,
      data: [],
      gallery: null
    };
  },
  methods: {
    btnClicked() {
      axios
        .get(`/api/recent/${this.index}`)
        .then(res => {
          let data = res.data.data;
          if (data) {
            this.data = [...this.data, ...data];
            //this.updateImages();
          }
          console.log(data);
        })
        .catch(err => console.log(err));
    },
    getVal(elem, style) {
      return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
    },
    getHeight(item) {
      return item.querySelector(".content").getBoundingClientRect().height;
    },
    resizeAll() {
      console.log("ca;lled");
      var altura = this.getVal(this.gallery, "grid-auto-rows");
      var gap = this.getVal(this.gallery, "grid-row-gap");
      this.gallery.querySelectorAll(".gallery-item").forEach(item => {
        var el = item;
        el.style.gridRowEnd =
          "span " + Math.ceil((this.getHeight(item) + gap) / (altura + gap));
      });
    }
  },
  mounted() {
    this.gallery = this.$refs.gallery;
    this.resizeAll();
    window.addEventListener("resize", this.resizeAll);

    // temporary hacky workaround
    this.btnClicked();
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

<style>
.gallery {
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 8px;
}
@media (max-width: 880px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  }
}
@media (max-width: 660px) {
  .gallery .content {
    padding: 2px;
  }
}
@media (max-width: 500px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}
.home_heading {
  text-align: left;
  margin-top: 0;
  margin-left: 10px;
  font-family: comfortaa;
  font-size: 1.5em;
}
</style>
