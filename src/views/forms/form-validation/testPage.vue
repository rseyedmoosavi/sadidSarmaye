<template>
  <div id="app">
    <Pagination/>
  </div>
</template>

<script>
import Pagination from "@/views/extensions/pagination/Pagination";


export default {
  name: "App",
  components: {
    Pagination
  }
};
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  margin-top: 10px;
}
</style>
