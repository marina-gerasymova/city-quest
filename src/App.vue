<template>
  <v-app class="app">
    <div class="app__main">
      <router-view :key="$route.path"/>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import { getStorage } from "firebase/storage";
import { getApp } from 'firebase/app';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
  mounted() {
    const app = getApp();
    const storage = getStorage(app);

    console.log(app, storage);
  }
}
</script>
