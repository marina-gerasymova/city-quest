<template>
  <div v-if="quest" class="page-size player-quest-page">
    <div class="player-quest-page__title title">
      <div>До початку гри залишилось:</div>
      <div class="player-quest-page__start-time">{{ activeTime }}</div>
    </div>
    <div class="player-quest-page__info">
      <div class="player-quest-page__line">
        <div>Початок:</div>
        <div>{{ this.startTime }}</div>
      </div>
      <div class="player-quest-page__line">
        <div>Локація:</div>
        <div>{{ quest.address }}</div>
      </div>
    </div>
    <div v-if="quest.teams">
      <div class="player-quest-page__teams">
        <div class="player-quest-page__title">Приєднатися до команди:</div>
        <Team class="player-quest-page__team" />
      </div>
    </div>
    <Button class="player-quest-page__button">Створити нову команду</Button>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Team from "@/components/Team.vue";
import { formatTime } from "@/helpers/questTimer.js";
import { formatDate } from "@/helpers/formatData.js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';


export default {
  name: 'PlayerQuestPage',
  components: {
    Team,
    Button
  },
  data() {
    return {
      quest: null,
      questCountDown: 0,
      startTime: '',
      readQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
    }
  },
  computed: {
    activeTime() {
      return formatTime(this.questCountDown);
    }
  },
  async mounted() {
    const questCode = this.$route.params.code
    const result = await this.readQuest({ questCode });
    console.log(result)
    this.quest = result.data.quest;
    this.startTime = formatDate(this.quest.time);
    console.log(this.startTime)
    this.questCountDown = +this.quest.time - Date.now();

    setInterval(() => {
      if (this.questCountDown > 0) {
        this.questCountDown -= 1000;
      }
    }, 1000)
    console.log(this.quest.time)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/player-quest-page.scss";

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
</style>