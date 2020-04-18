<template>
  <div>
    <Header title="Placeholder Profile" />
    <template v-if="data">
      <pre v-if="!data.error">
        user id: {{ data.id }}
        name: {{ data.name }}
        username: {{ data.username }}
        email: {{ email }}
      </pre>
      <button @click="logout" v-if="userLoggedIn">logout</button>
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
      console.log('logout');
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(err => console.log(err));
    },
  },
  created() {
    axios
      .get(`/api/user/data/${this.$route.params.username}`)
      .then(res => {
        this.data = res.data;
      })
      .catch(err => console.log(err));
  },
};
</script>

<style scoped>
pre {
  text-align: left;
  font-size: 2em;
}
</style>
