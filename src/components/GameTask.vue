<template>
  <div v-if="task" class="game-task">
    <div class="game-task__title">{{ task.name }}</div>
    <div class="game-task__image-wrap">
      <img :src="task.imgUrl">
    </div>
    <div class="game-task__description">
      {{ task.description }}
    </div>
    <v-text-field
      class="cq-text-input"
      v-model="key"
      label="Відповідь"
      outlined
      required
    ></v-text-field>
    <Button @click="sendKey" class="game-task__button">Відправити</Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: 'GameTask',
  components: {
    Button
  },
  data() {
    return {
      key: '',
      task: null,
      faasReadTask: httpsCallable(getFunctions(getApp()), 'readTask'),
      faasTeamNextTask: httpsCallable(getFunctions(getApp()), 'nextTaskTeam'),
    };
  },
  async mounted() {
    const taskData = await this.faasReadTask({
      questId: this.$route.params.code,
      taskUid: this.$route.params.taskId
    })

    if (taskData.data) {
      this.task = taskData.data.task;
    } else {
      this.$router.back();
    }
  },
  methods: {
    sendKey() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/game-task.scss";
</style>
