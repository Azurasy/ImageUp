<template>
  <div>
    <p class="heading">Create Account</p>
    <div class="container">
      <div :class="['content', $store.getters.theme]" @keyup.enter="submit">
        <input ref="form_name" type="text" placeholder="name" />
        <input ref="form_username" type="text" placeholder="username" />
        <input ref="form_email" type="text" placeholder="email" />
        <input ref="form_password" type="password" placeholder="password" />
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
//import axios from "axios";

export default {
  name: 'Signup',
  data: function() {
    return {
      error: '',
    };
  },
  methods: {
    formData() {
      return {
        name: this.$refs.form_name.value,
        username: this.$refs.form_username.value,
        email: this.$refs.form_email.value,
        password: this.$refs.form_password.value,
        confirm: this.$refs.form_confirm.value,
      };
    },
    submit() {
      const inputError = this.invalidInput();
      if (inputError) return (this.error = inputError);

      this.error = '';
      this.$refs.submit.disabled = true;

      const body = this.formData();

      this.$store
        .dispatch('signup', body)
        .then(() => {
          this.$router.push(`/u/${body.username}`);
        })
        .catch(err => {
          this.error = err.response.data.reason;
          this.$refs.submit.disabled = false;
        });
    },
    invalidInput() {
      let fields = this.formData();
      const { username, email, password, confirm } = fields;

      const userRE = /^[a-zA-Z0-9_-]+$/;
      const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // check field length
      for (let key in fields) {
        let val = fields[key];
        if (val.length < 1) return `${key} is empty`;
      }

      // username length
      if (username.length < 4 || username.length > 32)
        return 'username must be between 4 and 32 characters';

      // password length
      if (password.length < 8 || password.length > 16)
        return 'password must be between 8 and 16 characters';

      // check username password characters
      fields = { username, password };
      for (let key in fields) {
        let val = fields[key];

        if (!val.match(userRE))
          return `invalid characters in ${key}. allowed: a-z A-Z 0-9 _ -`;
      }

      // check email
      if (!email.match(emailRE)) return 'invalid email';

      // confirm password
      if (password != confirm) {
        this.$refs.form_password.value = '';
        this.$refs.form_confirm.value = '';
        return 'password does not match';
      }

      return false;
    },
  },
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
  font-family: 'Comfortaa';
  width: 300px;
  margin-top: 1em;
  box-shadow: 0 4px 102px 0 rgba(0, 0, 0, 0.01), 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  padding-left: 10px;
  outline: none;
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
  user-select: none;
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
  color: #d93e38;
  font-size: 1.2em;
}
</style>
