<template>
  <div v-if="quest" class="page-size player-quest-page">
    <div class="player-quest-page__title title">
      <div>{{ quest.name }}</div>
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
    <div v-if="teams.length" class="player-quest-page__teams-wrapper">
      <div
        v-for="team in teams"
        :key="team.uid"
      >
        <div class="player-quest-page__teams">
          <div class="player-quest-page__title">Приєднатися до команди:</div>
          <Team
            class="player-quest-page__team"
            :team="team"
          />
        </div>
      </div>
    </div>
    <Button
      class="player-quest-page__button"
      @button-click="createNewTeam"
    >
      Створити нову команду
    </Button>
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
      teams: [],
      quest: null,
      questCountDown: 0,
      startTime: '',
      readQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
      getTeamInfo: httpsCallable(getFunctions(getApp()), 'readQuestTeams'),
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
    
    this.quest = result.data.quest;
    this.startTime = formatDate(this.quest.time);
    this.questCountDown = +this.quest.time - Date.now();

    console.log(this.quest.teamCap)

    if(this.quest.teamCap) {
      const payload = {
        questCode: this.$route.params.code,
      }

      const teamInfo = await this.getTeamInfo(payload)

      if (!teamInfo.data) {
        this.teams = [];
      } else {
        this.teams = [teamInfo.data.teams].flat();
      }

      console.log(teamInfo)
      console.log('TEAM', this.teams)
    }
    
    console.log(this.teams)
    console.log(result)
    console.log(this.startTime)

    setInterval(() => {
      if (this.questCountDown > 0) {
        this.questCountDown -= 1000;
      }
    }, 1000)
    console.log(this.quest.time)
  },
  methods: {
    createNewTeam() {
      this.$router.push(`/creating-team/${this.$route.params.code}`);
    }
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