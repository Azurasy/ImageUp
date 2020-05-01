<template>
  <div class="gallery-item">
    <div class="content">
      <a :href="page_url" @click.prevent="clicked">
        <img :id="'img-' + data.uuid" src="@/assets/images/blank.png" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageTile',
  props: ['data'],
  data: function() {
    return {
      img_url: `${this.data.base_url}${this.data.uuid}${this.data.file_ext}`,
      page_url: `/i/${this.data.uuid}`,
    };
  },
  methods: {
    clicked() {
      this.$router.push(this.page_url);
    },
  },
  mounted() {
    let img = document.getElementById(`img-${this.data.uuid}`);
    img.src = this.data.downloadingImage.src;
    setTimeout(() => (img.style.visibility = 'visible'), 500);
    this.$emit('image_loaded');
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  border-radius: 5px;
  transition: all 1.5s ease;
  visibility: hidden;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
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

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
