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
    <Button @button-click="sendKey" class="game-task__button">Відправити</Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapActions } from 'vuex';

export default {
  name: 'GameTask',
  components: {
    Button
  },
  data() {
    return {
      key: '',
      task: null,
      faasReadQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
      faasGetTeamInfo: httpsCallable(getFunctions(getApp()), 'getTeamInfo'),
      faasReadTask: httpsCallable(getFunctions(getApp()), 'readTask'),
      faasSubmitTask: httpsCallable(getFunctions(getApp()), 'submitTask'),
      faasTeamNextTask: httpsCallable(getFunctions(getApp()), 'nextTaskTeam'),
    };
  },
  async beforeMount() {
    console.log(this.$route)
    const activeQuest = await this.faasReadQuest({ questCode: this.$route.params.code })
    this.$store.dispatch(
      'quest/setActiveQuest',
      activeQuest.data.quest
    )
    if (!this.$route.params.taskId) {
      // get task id
      const currentTaskId = await this.faasGetTeamInfo({
        questCode: this.$route.params.code,
        teamUid: this.$route.params.teamId
      })
      if (currentTaskId.data) {
        this.task = currentTaskId.data.team.currentTask;

        if (this.task) {
          this.$router.push(`${this.$route.path}/${this.task}`);
        }
      } else {
        this.$router.back();
      }
    } else {
      // get task info
      const currentTaskId = await this.faasGetTeamInfo({
        questCode: this.$route.params.code,
        teamUid: this.$route.params.teamId
      })

      const taskId = currentTaskId.data.team.currentTask;

      if (this.$route.params.taskId !== taskId) {
        this.$router.push(`/game/${this.$route.params.code}/${this.$route.params.teamId}/${taskId}`);
      }

      const taskData = await this.faasReadTask({
        questCode: this.$route.params.code,
        taskUid: taskId || this.$route.params.taskId
      });

      if (taskData.data?.task) {
        this.task = taskData.data.task;
      } else {
        this.$router.push(`/player-quest-page/${this.$route.questCode}`);
      }
    }
  },
  methods: {
    ...mapActions({
      getNextTaskId: 'quest/getNextTaskId'
    }),
    async sendKey() {
      // submit answer
      const result = await this.faasSubmitTask({
        questCode: this.$route.params.code,
        taskUid: this.$route.params.taskId,
        key: this.key.toUpperCase()
      })

      if (result.data.next) {
        const questStatus = await this.getNextTaskId(this.$route.params.taskId);
        console.log(questStatus)
        await this.faasTeamNextTask({
          questCode: this.$route.params.code,
          teamUid: this.$route.params.teamId,
          nextTaskId: questStatus.nextId,
          progress: questStatus.progress
        })

        if (questStatus.done) {
          this.$router.push(`/finish/${this.$route.params.code}/${this.$route.params.teamId}`)
        } else {
          this.$router.push(`/game/${this.$route.params.code}/${this.$route.params.teamId}/${questStatus.nextId}`);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/game-task.scss";
</style>
