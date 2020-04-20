<template>
  <div>
    <p class="heading">Login</p>
    <div class="container">
      <div :class="['content', $store.getters.theme]" @keyup.enter="submit">
        <input ref="form_username" type="text" placeholder="username" />
        <input ref="form_password" type="password" placeholder="password" />
        <p ref="error" class="error" v-if="error">{{ error }}</p>
        <div class="button" ref="submit" @click="submit">Continue</div>
        <div class="smaller button" @click="$emit('signup')">
          dont have an account? Signup
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: 'Login',
  data: function() {
    return {
      error: '',
    };
  },
  methods: {
    formData() {
      return {
        username: this.$refs.form_username.value,
        password: this.$refs.form_password.value,
      };
    },
    submit() {
      if (this.invalidInput()) return;
      this.error = '';
      this.$refs.submit.disabled = true;

      const body = this.formData();

      this.$store
        .dispatch('login', body)
        .then(() => {
          this.$router.push(`/u/${body.username}`);
        })
        .catch(err => {
          this.error = err.response.data.reason;
          this.$refs.submit.disabled = false;
        });
    },
    invalidInput() {
      // check field length
      let fields = this.formData();
      for (let key in fields) {
        let val = fields[key];

        if (val.length < 1) {
          this.error = `${key} is empty`;
          return true;
        }
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
  font-size: 3em;
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
