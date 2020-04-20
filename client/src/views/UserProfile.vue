<template>
  <div>
    <Header title="Placeholder Profile" />
    <template v-if="data">
      <button class="data" @click="logout" v-if="userLoggedIn">logout</button>
      <template v-if="!data.error">
        <pre class="data">
    User data:
    
      id: {{ data.id }}
      name: {{ data.name }}
      username: {{ data.username }}
      email: {{ email }}
        </pre>
        <pre class="data">  Images:</pre>
        <ul class="imgdata">
          <li v-for="img in images" :key="img.uuid" @click="imageClicked(img)">
            {{ img.file_name }}{{ img.file_ext }}
          </li>
        </ul>
      </template>
      <pre v-else>{{ data.error }}</pre>
    </template>
  </div>
</template>

<script>
import Header from '../components/Header';
import axios from 'axios';

export default {
  name: 'UserProfile',
  components: {
    Header,
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
.data {
  text-align: left;
  font-size: 1.7em;
}
.imgdata {
  text-align: left;
  font-size: 1.2em;
  padding-left: 60px;
  text-decoration: underline;
}
.imgdata:hover {
  cursor: pointer;
}
</style>
