<template>
<div>

  <input
    type="file"
    @change="onFileChange"
  >

  <img :src="imageUrl" alt="image">
</div>
</template>

<script>
/* eslint-disable no-unreachable */
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: 'ImageUpload',
  data() {
    return {
      image: null,
      imageUrl: '',
      getImageUrl: httpsCallable(getFunctions(getApp()), 'getTaskImageUrl'),
      uploadTaskImage: httpsCallable(getFunctions(getApp()), 'uploadTaskImage'),
    }
  },
  methods: {
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      console.log(files[0]);
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        const image = e.target.result;
        console.log(image.toString());

        vm.uploadImage(image.toString());
      };
      reader.readAsDataURL(file);
    },
    async uploadImage(dataUrl) {
      await this.uploadTaskImage({
        questId: 'quest-id',
        taskId: 'task-id',
        dataUrl
      });

      this.getImage();
    },
    getImage() {
      this.getImageUrl({
        questId: 'quest-id',
        taskId: 'task-id'
      })
        .then((result) => {
          const data = result.data;
          console.log('res', data);
          this.imageUrl = data.imageUrl;
        })
    }
  }
}
</script>

<style>

</style>