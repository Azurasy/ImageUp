<template>
  <div class="content">
    <Header title="Upload" />
    <SelectFile @selected="selectedFile" v-if="!file" />
    <SelectOptions @selected="selectedOptions" v-if="file" />
  </div>
</template>

<script>
import axios from "axios";

import Header from "../components/Header";
import SelectFile from "../components/upload/SelectFile";
import SelectOptions from "../components/upload/SelectOptions";

export default {
  name: "Upload",
  components: {
    Header,
    SelectFile,
    SelectOptions
  },
  data: function() {
    return {
      file: null,
      options: null
    };
  },
  methods: {
    selectedFile(file) {
      this.file = file;
      console.log(`Selected: ${file.name}`);
    },
    selectedOptions(options) {
      this.options = options;
      console.log(
        `${options.name} - ${options.exposure} - ${options.expiration}`
      );
      this.upload();
    },
    upload() {
      let formData = new FormData();
      formData.append("image", this.file, this.file.name);
      formData.append("options", JSON.stringify(this.options));

      axios
        .post("http://localhost:8181/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(() => {
          console.log(`Upload Successful`);
        })
        .catch(res => {
          console.log(`Upload Failed!  ${res}`);
        });
    }
  },
  watch: {
    "$store.getters.reload": function(val) {
      if (val) {
        this.file = null;
        this.$store.dispatch("setReload", false);
      }
    }
  }
};
</script>

<style scoped></style>
