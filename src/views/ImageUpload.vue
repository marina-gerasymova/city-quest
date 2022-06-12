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
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: 'ImageUpload',
  data() {
    return {
      image: null,
      imageUrl: ''
    }
  },
  methods: {
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      console.log(files[0]);

      const functions = getFunctions(getApp());
      const getImageUrl = httpsCallable(functions, 'getImageUrl');

      getImageUrl({
        questId: 'quest-id',
        taskId: 'task-id'
      })
        .then((result) => {
          const data = result.data;
          console.log('res', data);
          this.imageUrl = data.imageUrl;
        })
    },
  }
}
</script>

<style>

</style>