<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #edecec;
}
* {
  box-sizing: border-box;
}
button {
  outline: none;
}
.card {
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0 27px 24px rgba(0, 0, 0, 0.2), 0 40px 77px rgba(0, 0, 0, 0.22);
}
.page-title {
  padding: 23px 26px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
