<template>
  <div>
    <Header :title="'Create Account'" />
    <input id="form_user" type="text" placeholder="username" />
    <input id="form_email" type="text" placeholder="email" />
    <input id="form_pass" type="text" placeholder="password" />
    <button @click="createAcc">Create Account</button>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../components/Header";

export default {
  components: {
    Header
  },
  methods: {
    createAcc() {
      let user = document.getElementById("form_user").value;
      let email = document.getElementById("form_email").value;
      let pass = document.getElementById("form_pass").value;
      let data = { username: user, email, password: pass };

      axios
        .post(`/api/register`, data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          console.log("created");
        })
        .catch(() => {
          console.log(`failed!`);
        });
    }
  }
};
</script>

<style scoped></style>
