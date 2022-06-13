<template>
  <v-app class="app">
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
