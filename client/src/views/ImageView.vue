<template>
  <div v-if="data">
    <Header :title="data.title" />
    <div class="cont">
      <img ref="vimage" src="@/assets/images/blank.png" />
      <img v-if="!loaded" src="@/assets/images/loading.gif" />
      <template v-else class="info">
        <p>
          Uploaded by:
          <span v-if="data.userId == 0">Anonymous</span>
          <a :href="`/u/${data.username}`" v-else @click.prevent="clicked">
            <span class="link" @click="gotoProfile">@{{ data.username }}</span>
          </a>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Header from '../components/Header';

export default {
  name: 'ImageView',
  components: {
    Header,
  },
  data: function() {
    return {
      data: null,
      loaded: false,
    };
  },
  methods: {
    gotoProfile() {
      this.$router.push(`/u/${this.data.username}`);
    },
  },
  created() {
    axios
      .get(`/api/img/data/${this.$route.params.id}`)
      .then(res => {
        this.data = res.data.data;
        if (this.data) {
          let downloadingImage = new Image();
          downloadingImage.onload = () => {
            this.$refs.vimage.src = downloadingImage.src;
            this.loaded = true;
          };
          downloadingImage.src = `/img/${this.data.uuid}${this.data.file_ext}`;
        } else {
          this.data = { title: res.data.reason };
        }
      })
      .catch(err => console.log(err));
  },
  watch: {
    '$store.getters.reload': function(val) {
      if (val) {
        this.$store.dispatch('setReload', false);
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 90%;
  padding-bottom: 20px;
  max-height: 70vh;
}

.info {
  display: flex;
  flex-direction: row;
}

p {
  padding-top: 0;
  margin-top: 0;
  display: block;
  padding-bottom: 10px;
}

.link {
  color: #238cf5;
  cursor: pointer;
}
.link:hover {
  color: #5399df;
  cursor: pointer;
}
a {
  text-decoration: none;
}
</style>
