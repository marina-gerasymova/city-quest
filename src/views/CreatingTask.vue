<template>
  <div class="creating-quest page-size">
    <div
      class="creating-quest__form"
    >
      <v-text-field
        class="cq-text-input"
        v-model="name"
        label="Назва завдання"
        outlined
        required
      ></v-text-field>
      <input
        id="file-select"
        lang="ua"
        class="v-input cq-text-input theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined"
        style="width: 100%; border: 1px solid #fff; height: 40px; margin-bottom: 16px; align-items: center; padding-left: 10px; padding-right: 10px; padding-top: 5px"
        type="file"
        accept="image/png, image/jpeg"
        prepend-icon="mdi-camera"
        label="Зображення"
        @change="onFileChange"
      >
      <v-text-field
        class="cq-text-input"
        v-model="description"
        label="Опис завдання"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="hint"
        label="Підказка"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="time"
        label="Час виконання, хв"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="key"
        label="Відповідь"
        outlined
        required
      ></v-text-field>
    </div>
    <div class="button-wrapper">
      <Button
        :disabled="!isValidForm"
        @button-click="createTask"
      >
        Cтворити завдання
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: 'CreatingTask',
  components: {
    Button
  },
  data() {
    return {
      name: '',
      imageDataUrl: '',
      description: '',
      hint: '',
      time: '',
      key: '',
      faasCreateTask: httpsCallable(getFunctions(getApp()), 'createTask'),
    }
  },
  computed: {
    isValidForm() {
      return this.name && this.imageDataUrl && this.description && this.hint && this.time && this.key;
    }
  },
  methods: {
    async createTask() {
      const result = await this.faasCreateTask({
        questCode: this.$route.params.code,
        name: this.name,
        description: this.description,
        hint: this.hint,
        key: this.key.toUpperCase(),
        time: this.time,
        imgDataUrl: this.imageDataUrl
      })

      if (result.data === null) {
        this.$router.go(-1);
      }
    },
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
        vm.imageDataUrl = image.toString();
      };
      reader.readAsDataURL(file);
    },
  }
}
</script>

<style lang="scss" scoped>

::-webkit-file-upload-button {
  border-radius: 3px;
  background-color: #fff;
  outline: none !important;
  border: none !important;
  color: #000;
}

#file-select {
  cursor: pointer;
}

#file-select:before {
  content: 'Оберіть зображення';
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 6px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
}
.page-size {
  margin: 0 auto;
  padding: 40px 0;
}

.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}

.creating-quest__form {
  width: 100%;
}
</style>
