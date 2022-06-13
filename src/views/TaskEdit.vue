<template>
  <div class="creating-quest page-size">
    <div
      v-if="task"
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
        @button-click="updateTask"
      >
        Зберегти зміни
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: 'EditTask',
  components: {
    Button
  },
  data() {
    return {
      task: null,
      name: '',
      imageDataUrl: '',
      description: '',
      hint: '',
      time: '',
      key: '',
      faasUpdateTask: httpsCallable(getFunctions(getApp()), 'updateTask'),
      faasReadTask: httpsCallable(getFunctions(getApp()), 'readTask'),
    }
  },
  computed: {
    isValidForm() {
      return this.name && this.description && this.hint && this.time && this.key;
    }
  },
  async mounted() {
    const taskData = await this.faasReadTask({ questCode: this.$route.params.code, taskUid: this.$route.params.taskId });
    const task = taskData.data.task;
    this.task = task;
    this.name = task.name;
    this.time = task.time;
    this.description = task.description;
    this.hint = task.hint;
    this.key = task.key;
  },
  methods: {
    async updateTask() {
      const result = await this.faasUpdateTask({
        questCode: this.$route.params.code,
        uid: this.task.uid,
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
