<template>
  <div>
    <div :class="['outer', this.$store.getters.theme]">
      <div
        :class="['dropcontainer', { hovering: hovering }, { invalid: invalid }]"
        @drop.prevent="dropped"
        @dragover.prevent="enter"
        @dragleave="leave"
        v-cloak
      >
        <div class="drop-overlay"></div>
        <div
          :class="['dropframe', { hovering: hovering }, { invalid: invalid }]"
        >
          <div style="height: 40%" />
          <div :class="['droptext', { invalid: invalid }]">
            {{ droptext }}
          </div>
        </div>
      </div>

      <div :class="['manual', this.$store.getters.theme]" @click="manual">
        <div class="manual-or">
          <span>or</span>
        </div>

        <span class="manual-text">
          Select image to upload
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectFile',
  data: function() {
    return {
      hovering: false,
      invalid: false,
      droptext: 'Drop image here',
    };
  },
  methods: {
    dropped(e) {
      this.leave();
      let files = e.dataTransfer.files;
      if (!files) return;
      if (this.isImage(files[0])) this.$emit('selected', files[0]);
      else this.invalidWarn();
    },
    enter() {
      this.droptext = 'Release file';
      this.hovering = true;
    },
    leave() {
      this.droptext = 'Drop image here';
      this.hovering = false;
    },
    isImage(file) {
      return file && file['type'].split('/')[0] === 'image';
    },
    invalidWarn() {
      this.invalid = true;
      this.droptext = 'Not an image!';
      setTimeout(() => {
        this.invalid = false;
        this.droptext = 'Drop image here';
      }, 2000);
    },
    manual() {
      let input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.click();
      input.onchange = () => {
        let files = input.files;
        if (!files) return;
        if (this.isImage(files[0])) this.$emit('selected', files[0]);
        else this.invalidWarn();
      };
    },
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
}

.outer.dark {
  background-color: #57606a;
  box-shadow: 0 4px 50px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}

.dropcontainer {
  position: relative;
  background-color: #3b444d;
  height: 250px;
  border-radius: 20px;
  z-index: 1;
}

.dropcontainer.hovering {
  background-color: #4e565e !important;
}

.dropcontainer.invalid {
  color: #ff6f69 !important;
}

.dropframe {
  max-width: 83%;
  height: 76%;
  border: rgb(165, 165, 165) dashed 5px;
  position: relative;
  left: 7%;
  top: 10%;
  border-radius: 10px;
  position: relative;
}

.dropframe.hovering {
  border-color: #42b983 !important;
}

.dropframe.invalid {
  border-color: #ff6f69 !important;
}

.droptext {
  color: white;
  font-size: 1.8em;
  opacity: 0.86;
  font-weight: bold;
  user-select: none;
}

.manual {
  height: 100px;
  background-color: #898e94;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  user-select: none;
}

.manual.dark {
  background-color: #57606a;
}

.manual:hover {
  cursor: pointer;
}

.manual-or {
  margin: auto;
  padding-top: 15px;
  opacity: 0.85;
  max-width: 70%;
  height: 10px;
  color: #cacaca;
  border-bottom: 2px solid #cacaca;
  text-align: center;
}

.manual-text {
  padding-top: 20px;
  display: block;
}

.manual:hover .manual-text {
  color: #ddd;
}

.manual-or span {
  background-color: #898e94;
  padding: 0 20px;
}

.manual.dark span {
  background-color: #57606a;
}

.drop-overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 250px;
  max-width: 350px;
}
</style>
