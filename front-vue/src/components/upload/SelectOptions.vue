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
            <option value="private" disabled>Private (login)</option>
          </select>
        </div>

        <div>
          <p>Expiration</p>
          <select id="file_expiration">
            <option value="never">Never</option>
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      <div :class="['upload-btn', this.$store.getters.theme]" @click="upload">
        <p>Upload</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectOptions",
  methods: {
    upload() {
      let name = document.getElementById("file_name").value;
      if (!name) name = "Untitled";
      let exposure = document.getElementById("file_exposure").value;
      let expiration = document.getElementById("file_expiration").value;
      this.$emit("selected", { name, exposure, expiration });
    }
  }
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
  font-family: "Comfortaa";
  width: 150px;
}

select {
  width: 150px;
  font-family: "Comfortaa";
  height: 2em;
  background-color: white;
  border: 3px solid white;
  border-radius: 2px;
  appearance: none;
  font-weight: bold;
}
</style>
