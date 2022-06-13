<template>
  <div v-if="quest" class="quest-full-info page-size">
    <div class="quest-full-info__title">
      <div>{{ quest.name }}</div>
      <div>
        <span class="material-symbols-outlined">
          settings
        </span>
      </div>
    </div>
    <div class="quest-full-info__content">
      <div class="quest-full-info__line">
        <div class="quest-full-info__label">{{ info[0].label }}</div>
        <div class="quest-full-info__value">{{ questTimer }}</div>
      </div>
      <div class="quest-full-info__line">
        <div class="quest-full-info__label">{{ info[1].label }}</div>
        <div class="quest-full-info__value">{{ quest.teamsNum }}</div>
      </div>
      <div class="quest-full-info__line">
        <div class="quest-full-info__label">{{ info[2].label }}</div>
        <div class="quest-full-info__value">{{ questPlayersNum }}/{{ quest.teamCap * quest.teamsNum }}</div>
      </div>
      <div class="quest-full-info__line">
        <div class="quest-full-info__label">{{ info[3].label }}</div>
        <div class="quest-full-info__value">{{ quest.address }}</div>
      </div>
      <div class="quest-full-info__line">
        <div class="quest-full-info__label">{{ info[4].label }}</div>
        <div class="quest-full-info__value">{{ quest.cost }}</div>
      </div>
      <div class="quest-full-info__line">
        <div class="quest-full-info__label">{{ info[5].label }}</div>
        <div class="quest-full-info__value">{{ quest.code }}</div>
      </div>
    </div>
    <div class="quest-full-info__tasks">
      <div class="quest-full-info__label">Завдання:</div>
      <div v-if="quest.tasks" class="quest-full-info__tasks-list">
        <Task
          v-for="task in questTasks"
          :key="task.uid"
          :task="task"
        />
      </div>
      <div class="button-wrapper">
        <Button
          @button-click="createNewTask"
        >
          Створити завдання
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import Button from "@/components/Button.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: "OrganizatorQuestPage",
  components: {
    Task,
    Button
  },
  data() {
    return {
      info: [
        {
          label: 'До початку залишилось:',
          value: '',
        },
        {
          label: 'Кількість команд:',
          value: '',
        },
        {
          label: 'Кількість учасників:',
          value: '',
        },
        {
          label: 'Локація старту:',
          value: '',
        },
        {
          label: 'Вартість:',
          value: '',
        },
        {
          label: 'Код квесту:',
          value: '',
        }
      ],
      quest: null,
      questCountDown: 0,
      questTasks: [],
      readQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
      readQuestTasks: httpsCallable(getFunctions(getApp()), 'readQuestTasks'),
    }
  },
  computed: {
    questTimer() {
      var delta = this.questCountDown / 1000;
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      var seconds = Math.floor(delta % 60);
      return `${days} днів ${hours} години ${minutes} хв. ${seconds} с.`;
    },
    questPlayersNum() {
      const teams = this.quest.teams;

      if (!teams) {
        return 0;
      }

      return teams.reduce((acc, team) => {
        return acc + (team.players?.length || 0)
      }, 0)
    }
  },
  async mounted() {
    const questCode = this.$route.params.code
    const result = await this.readQuest({ questCode });
    const questTasks = await this.readQuestTasks({ questCode });
    this.quest = result.data.quest;
    this.questTasks = questTasks.data.tasks;
    this.questCountDown = new Date(+this.quest.time) - Date.now();

    setInterval(() => {
      if (this.questCountDown > 0) {
        this.questCountDown -= 1000;
      }
    }, 1000)
  },
  methods: {
    createNewTask() {
      this.$router.push(`/creating-task/${this.quest.code}`);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/organizator-quest-page.scss";

.page-size {
  margin: auto;
  padding: 40px 0;
}

.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}

</style>
