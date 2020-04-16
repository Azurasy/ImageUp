<template>
  <div>
    <p class="heading">Create Account</p>
    <div class="container">
      <div :class="['content', $store.getters.theme]" @keyup.enter="submit">
        <input ref="form_user" type="text" placeholder="username" />
        <input ref="form_email" type="text" placeholder="email" />
        <input ref="form_pass" type="password" placeholder="password" />
        <input
          ref="form_confirm"
          type="password"
          placeholder="confirm password"
        />
        <p ref="error" class="error" v-if="error">{{ error }}</p>
        <div class="button" ref="submit" @click="submit">Sign up</div>
        <div class="smaller button" @click="$emit('login')">
          already have an account? Login
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data: function() {
    return {
      error: ""
    };
  },
  methods: {
    submit() {
      if (!this.inputValid()) return;
      this.error = "";
      //this.$refs.submit.disabled = true;

      let data = {
        username: this.$refs.form_user.value,
        email: this.$refs.form_email.value,
        password: this.$refs.form_pass.value
      };

      axios
        .post(`/api/signup`, data, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          this.error = "Placerholder: Sucessess!";
        })
        .catch(() => {
          this.error = "Failed: Server error!";
        });
    },
    inputValid() {
      let username = this.$refs.form_user.value;
      let email = this.$refs.form_email.value;
      let password = this.$refs.form_pass.value;
      let confirm = this.$refs.form_confirm.value;

      const userRE = /^[a-zA-Z0-9_-]+$/;
      const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // do get request to see if username is taken
      // /api/checkusername/:username

      // check field length
      let fields = { username, email, password, "confirm password": confirm };
      for (let key in fields) {
        let val = fields[key];

        if (val.length < 1) {
          this.error = `${key} is empty!`;
          return false;
        }
      }

      // username length
      if (username.length < 4 || password.length > 32) {
        this.error = "Username must be between 4 and 32 characters!";
        return false;
      }

      // password length
      if (password.length < 8 || password.length > 16) {
        this.error = "Password must be between 8 and 16 characters!";
        return false;
      }

      // check username password characters
      fields = { username, password };
      for (let key in fields) {
        let val = fields[key];

        if (!val.match(userRE)) {
          this.error = `Invalid characters in ${key}. Allowed: a-z A-Z 0-9 _ -`;
          return false;
        }
      }

      // check email
      if (!email.match(emailRE)) {
        this.error = `Invalid email!`;
        return false;
      }

      // confirm password
      if (password != confirm) {
        this.error = "Password does not match!";
        this.$refs.form_confirm.value = "";
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  max-width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  max-width: 317px;
}

input {
  height: 1.7em;
  border: 3px solid rgba(214, 214, 214, 0.52);
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2em;
  font-family: "Comfortaa";
  width: 300px;
  margin-top: 1em;
  box-shadow: 0 4px 102px 0 rgba(0, 0, 0, 0.01), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  padding-left: 10px;
}

div.dark input {
  background-color: rgb(204, 204, 204);
  color: rgb(0, 0, 0);
  border: 3px solid rgba(156, 156, 156, 0.52);
}

.button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: normal;
  cursor: pointer;
  outline: inherit;
  font-size: 1.7em;
  margin-top: 1em;
}

.button:hover {
  font-weight: bold;
}

.heading {
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 10px;
  font-size: 2.3em;
  font-weight: normal;
}

.smaller {
  font-size: 1em;
}

.error {
  margin-bottom: 0;
  color: #ff6f69;
  font-size: 1.2em;
}
</style>
