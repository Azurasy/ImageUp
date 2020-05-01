<template>
  <div>
    <template v-if="data">
      <div :class="['container', $store.getters.theme]">
        <div class="info-container">
          <div class="avatar">
            <svg viewBox="-42 0 512 512.002" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0"
              />
              <path
                d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0"
              />
            </svg>
          </div>
          <div class="info-container-data">
            <h1>{{ data.name }}</h1>
            <h6>@{{ data.username }}</h6>
          </div>
        </div>

        <div class="actions">
          <button class="logout" @click="logout" v-if="userLoggedIn">logout</button>
        </div>
      </div>

      <Header class="header" />

      <template v-if="!data.error">
        <Gallery :user_id="data.id" />
      </template>
      <pre v-else>{{ data.error }}</pre>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header';
import Gallery from '../components/gallery/Gallery';

export default {
  name: 'UserProfile',
  components: {
    Header,
    Gallery,
  },
  data: function() {
    return {
      data: null,
      images: [],
    };
  },
  computed: {
    email: function() {
      if (this.data.email) return this.data.email;
      return '*requires login*';
    },
    userLoggedIn: function() {
      if (
        this.$store.getters.isLoggedIn &&
        this.data.id == this.$store.getters.user.id
      )
        return true;
      return false;
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(err => console.log(err));
    },
    imageClicked(img) {
      this.$router.push(`/i/${img.uuid}`);
    },
  },
  created() {
    axios
      .get(`/api/user/data/${this.$route.params.username}`)
      .then(res => {
        this.data = res.data;
        axios
          .get(`/api/img/recent/${this.data.id}/-1`)
          .then(res => {
            this.images = res.data.data;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },
};
</script>

<style scoped>
div {
  font-family: comfortaa;
}
.data {
  font-family: comfortaa;
  text-align: left;
  font-size: 1.2em;
}
.imgdata {
  text-align: left;
  font-size: 1.2em;
  padding-left: 40px;
  text-decoration: underline;
  cursor: pointer;
}
li {
  line-height: 1.4em;
}
.container,
.info-container,
.actions {
  display: flex;
}
.container {
  justify-content: space-between;
  flex-wrap: wrap;
}
.info-container-data {
  display: flex;
  flex-direction: column;
  text-align: left;
}
h1 {
  font-size: 3em;
  margin-bottom: 0;
}
h6 {
  font-size: 1em;
  margin: 0;
}
.avatar {
  width: 100px;
  height: 100px;
}
.avatar svg {
  max-width: 100%;
  max-height: 70%;
  fill: #2c3e50;
  padding-top: 33px;
}
.container.dark .avatar svg {
  fill: #a4abbb;
}
.header {
  padding-bottom: 20px;
}
.actions {
}

.logout {
  width: auto;
  height: 50px;
  font-size: 1.3em;
  border: none;
  border: 3px solid rgba(214, 214, 214, 0.52);
  color: rgba(156, 156, 156, 0.52);
  border-radius: 10px;
  margin-top: 35%;
  margin-right: 20px;
  cursor: pointer;
}
.logout:hover {
  background-color: rgb(243, 243, 243);
}
.container.dark .logout {
  background-color: #2d333c;
  border: 3px solid rgba(111, 111, 111, 0.52);
  color: rgba(156, 156, 156, 0.52);
}
.container.dark .logout:hover {
  background-color: #323944;
}
</style>
