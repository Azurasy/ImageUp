<template>
  <div class="gallery-item">
    <div class="content">
      <a :href="page_url" @click.prevent="clicked">
        <img :id="'img-' + data.uuid" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageTile",
  props: ["data"],
  data: function() {
    return {
      img_url: `${this.data.base_url}${this.data.uuid}${this.data.file_ext}`,
      page_url: `/i/${this.data.uuid}`
    };
  },
  methods: {
    clicked() {
      this.$router.push(this.page_url);
    },
    loaded() {
      console.log(this.data.file_name);
    }
  },
  created() {
    let downloadingImage = new Image();
    downloadingImage.onload = () => {
      document.getElementById(`img-${this.data.uuid}`).src =
        downloadingImage.src;
      this.loaded = true;
      setTimeout(() => this.$emit("image_loaded"), 500);
    };
    downloadingImage.src = this.img_url;
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  border-radius: 5px;
  transition: all 1.5s ease;
}
.content {
  padding: 4px;
}
.gallery-item {
  transition: grid-row-start 300ms linear;
  transition: transform 300ms ease;
  transition: all 0.5s ease;
  cursor: pointer;
}
.gallery-item:hover {
  transform: scale(1.025);
}
</style>
