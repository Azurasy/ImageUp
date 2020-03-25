<template>
  <div class="home">
    <Header title="ImageUp" />
    <!--button @click="btnClicked">Fetch</button-->

    <p class="heading">
      Recently Uploaded
    </p>

    <!-- Credits for image gallary code: https://uicookies.com/css-image-galleries/ and https://codepen.io/vhanla/pen/PxjZvj -->
    <div class="gallery" id="gallery" ref="gallery">
      <div class="gallery-item" v-for="item in data" :key="item.id">
        <div class="content">
          <img :src="`/img/${item.uuid}${item.file_ext}`" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    Header
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
    setTimeout(() => this.resizeAll(), 250);
    setTimeout(() => this.resizeAll(), 500);
    setTimeout(() => this.resizeAll(), 750);
    setTimeout(() => this.resizeAll(), 1000);
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
.gallery {
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 8px;
}
.gallery img {
  max-width: 100%;
  border-radius: 5px;
  transition: all 1.5s ease;
}
.gallery .content {
  padding: 4px;
}
.gallery .gallery-item {
  transition: grid-row-start 300ms linear;
  transition: transform 300ms ease;
  transition: all 0.5s ease;
  cursor: pointer;
}
.gallery .gallery-item:hover {
  transform: scale(1.025);
}

@media (max-width: 400px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  }
}

.heading {
  text-align: left;
  margin-top: 0;
  margin-left: 10px;
  font-family: comfortaa;
  font-size: 1.5em;
}
</style>
