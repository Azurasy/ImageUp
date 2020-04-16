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
  }
};
</script>

<style scoped></style>
