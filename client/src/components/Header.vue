<template>
  <div :class="['header', this.$store.getters.theme, { height: title }]">
    <p v-if="title">{{ title }}</p>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['title'],
};
</script>

<style scoped>
.header {
  font-family: 'Comfortaa';
  max-width: 100%;
  font-size: 4em;
}
.header p {
  margin: 0;
  padding: 0;
}
hr {
  margin: 0;
  margin-top: 15px;
  padding-top: 4px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    #2c3e50,
    rgba(0, 0, 0, 0)
  );
  opacity: 0.1;
}
.header.dark hr {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    #ffffff,
    rgba(0, 0, 0, 0)
  );
}
.height {
  height: 125px;
  padding-top: 30px;
}
</style>
