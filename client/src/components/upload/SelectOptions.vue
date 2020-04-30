<template>
  <div>
    <div :class="['outer', this.$store.getters.theme]">
      <div class="form-cont">
        <div>
          <p>Name / Title</p>
          <input id="file_name" type="text" placeholder="Untitled" />
        </div>

        <div>
          <p>Exposure</p>
          <select id="file_exposure">
            <option value="public">Public</option>
            <option value="unlisted">Unlisted</option>
            <option ref="private" value="private">Private {{privateMsg}}</option>
          </select>
        </div>

        <div>
          <p>Expiration</p>
          <select id="file_expiration">
            <option value="0">Never</option>
            <option value="60">Minute</option>
            <option value="3600">Hour</option>
            <option value="86400">Day</option>
            <option value="2592000">Month</option>
            <option value="31536000">Year</option>
          </select>
        </div>
      </div>

      <div :class="['upload-btn', this.$store.getters.theme]" @click="upload">
        <p v-if="!uploading">Upload</p>
        <p v-else>Uploading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectOptions',
  data: function() {
    return {
      uploading: false,
      privateMsg: '',
    };
  },
  methods: {
    upload() {
      if (!this.uploading) {
        this.uploading = true;
        document.getElementById('file_name').disabled = true;
        document.getElementById('file_exposure').disabled = true;
        document.getElementById('file_expiration').disabled = true;

        let name = document.getElementById('file_name').value;
        if (!name) name = 'Untitled';

        let exposure = document.getElementById('file_exposure').value;

        let expiration = parseInt(
          document.getElementById('file_expiration').value,
        );

        this.$emit('selected', { name, exposure, expiration });
      }
    },
  },
  mounted() {
    this.$refs.private.disabled = true;
    this.privateMsg = '(login)';
    if (this.$store.getters.isLoggedIn) {
      this.$refs.private.disabled = false;
      this.privateMsg = '';
    }
  },
};
</script>

<style scoped>
.outer {
  box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  max-width: 350px;
  margin: auto;
  border-radius: 20px;
  background-color: #898e94;
  color: white;
}

.outer.dark {
  background-color: #57606a;
  box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

p {
  font-size: 1.5em;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 7px;
}

.form-cont {
  background-color: #3b444d;
  height: 270px;
  border-radius: 20px;
  color: #ddd;
}

.upload-btn {
  background-color: #898e94;
  border-radius: 20px;
  color: white;
  user-select: none;
}

.upload-btn.dark {
  background-color: #57606a;
}

.upload-btn:hover {
  cursor: pointer;
  color: #ddd;
}

.upload-btn p {
  padding: 20px 0;
  font-size: 2em;
}

input {
  height: 1.5em;
  border: 3px solid white;
  border-radius: 2px;
  font-weight: bold;
  font-family: 'Comfortaa';
  width: 150px;
  user-select: none;
}

select {
  width: 150px;
  font-family: 'Comfortaa';
  height: 2em;
  background-color: white;
  border: 3px solid white;
  border-radius: 2px;
  appearance: none;
  font-weight: bold;
  user-select: none;
}
</style>
