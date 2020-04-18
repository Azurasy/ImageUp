<template>
  <div>
    <Header :title="'ImageUp'" />
    <Signup v-if="tab == 'signup'" @login="showLogin" />
    <Login v-if="tab == 'login'" @signup="showSignup" />
  </div>
</template>

<script>
import Header from "../components/Header";
import Signup from "../components/account/Signup";
import Login from "../components/account/Login";

export default {
  components: {
    Header,
    Signup,
    Login
  },
  data: function() {
    return {
      tab: "login"
    };
  },
  methods: {
    showLogin() {
      this.tab = "login";
    },
    showSignup() {
      this.tab = "signup";
    }
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push(`/u/${this.$store.getters.user.username}`);
    }
  },
  watch: {
    "$store.getters.reload": function(val) {
      if (val) {
        this.$store.dispatch("setReload", false);
        this.tab = "login";
      }
    }
  }
};
</script>

<style scoped></style>
