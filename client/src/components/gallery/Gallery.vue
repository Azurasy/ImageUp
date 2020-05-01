<template>
  <div>
    <div class="gallery" id="gallery" ref="gallery">
      <ImageTile v-for="item in images" :key="item.uuid" :data="item" @image_loaded="resizeAll" />
    </div>
    <div v-if="noImages" class="no-img">
      <p>No images yet</p>
    </div>
  </div>
</template>

<script>
/* Credits to https://uicookies.com/css-image-galleries/ and https://codepen.io/vhanla/pen/PxjZvj
    for the core gallery code */

import axios from 'axios';
import ImageTile from './ImageTile';

export default {
  name: 'Home',
  components: {
    ImageTile,
  },
  props: ['user_id'],
  data: function() {
    return {
      index: -1,
      data: [],
      images: [],
      gallery: null,
      noImages: false,
    };
  },
  methods: {
    fetchImages() {
      axios
        .get(`/api/img/recent/${this.user_id}/${this.index}`)
        .then(res => {
          let data = res.data.data;
          if (data.length > 0) {
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
          } else {
            if (this.data.length == 0) this.noImages = true;
          }
        })
        .catch(err => console.log(err));
    },
    getVal(elem, style) {
      return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
    },
    getHeight(item) {
      return item.querySelector('.content').getBoundingClientRect().height;
    },
    resizeAll() {
      var altura = this.getVal(this.gallery, 'grid-auto-rows');
      var gap = this.getVal(this.gallery, 'grid-row-gap');
      this.gallery.querySelectorAll('.gallery-item').forEach(item => {
        var el = item;
        el.style.gridRowEnd =
          'span ' + Math.ceil((this.getHeight(item) + gap) / (altura + gap));
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
    },
  },
  mounted() {
    this.gallery = this.$refs.gallery;
    this.resizeAll();
    window.addEventListener('resize', this.resizeAll);
    this.fetchImages();
  },
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
@media (max-width: 570px) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}
.no-img {
  font-size: 1.5em;
}
</style>
