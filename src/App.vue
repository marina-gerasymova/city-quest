<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import { getStorage } from "firebase/storage";
import { getApp } from 'firebase/app';

export default {
  name: 'App',
  mounted() {
    const app = getApp();
    const storage = getStorage(app);

    console.log(app, storage);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>
