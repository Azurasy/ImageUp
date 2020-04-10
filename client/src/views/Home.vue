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
        v-for="item in images"
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
      images: [],
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
            data.forEach(img => {
              img.loaded = false;
              img.added = false;
              img.downloadingImage = new Image();
              img.downloadingImage.onload = () => {
                //console.log(`${downloadingImage.width}x${downloadingImage.height}`);
                img.loaded = true;
                this.updateLoaded();
              };
              img.downloadingImage.src = img.base_url + img.uuid + img.file_ext;
            });

            this.data = [...this.data, ...data];
          }
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
      var altura = this.getVal(this.gallery, "grid-auto-rows");
      var gap = this.getVal(this.gallery, "grid-row-gap");
      this.gallery.querySelectorAll(".gallery-item").forEach(item => {
        var el = item;
        el.style.gridRowEnd =
          "span " + Math.ceil((this.getHeight(item) + gap) / (altura + gap));
      });
    },
    updateLoaded() {
      for (let i = 0; i < this.data.length; i++) {
        let img = this.data[i];
        if (img.loaded && !img.added) {
          if (i == 0 || this.images.includes(this.data[i - 1])) {
            this.images.push(img);
            img.added = true;
          }
        }
      }
      this.resizeAll();
      setTimeout(() => this.resizeAll(), 500);
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
    },
    "$route.fullPath": function(val) {
      if (val === "/") this.resizeAll();
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
