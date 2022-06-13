<template>
  <div v-if="quest" class="page-size player-quest-page">
    <div class="player-quest-page__title title">
      <div class="player-quest-page__title">{{ quest.name }}</div>
      <div>До початку гри залишилось:</div>
      <div class="player-quest-page__start-time">{{ activeTime }}</div>
    </div>
      <!-- v-if="questCountDown < 0" -->
    <Button
      class="button--start button--red"
      @button-click="startGame"
    >
      Старт
    </Button>
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
      <div class="player-quest-page__label">Приєднатися до команди:</div>
      <div
        v-for="team in teams"
        :key="team.uid"
      >
        <div class="player-quest-page__teams">
          <Team
            class="player-quest-page__team"
            :team="team"
            @team-update="updateTeams"
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
  <div v-else class="page-size">
    <Loader />
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import Team from "@/components/Team.vue";
import Loader from "@/components/Loader.vue";
import { formatTime } from "@/helpers/questTimer.js";
import { formatDate } from "@/helpers/formatData.js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapGetters } from 'vuex';


export default {
  name: 'PlayerQuestPage',
  components: {
    Team,
    Button,
    Loader
  },
  data() {
    return {
      teams: [],
      quest: null,
      questCountDown: 0,
      startTime: '',
      readQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
      faasReadQuestTeams: httpsCallable(getFunctions(getApp()), 'readQuestTeams'),
      faasReadUser: httpsCallable(getFunctions(getApp()), 'readUser'),
      faasTeamToNextTask: httpsCallable(getFunctions(getApp()), 'nextTaskTeam'),
    }
  },
  computed: {
    ...mapGetters({
      tasksList: 'quest/tasksList',
      uid: 'user/userUid'
    }),
    activeTime() {
      return formatTime(this.questCountDown);
    }
  },
  async mounted() {
    const questCode = this.$route.params.code
    const result = await this.readQuest({ questCode });
    
    this.quest = result.data.quest;

    this.$store.dispatch('quest/setActiveQuest', this.quest);

    this.startTime = formatDate(this.quest.time);
    this.questCountDown = +this.quest.time - Date.now();
    console.log(this.questCountDown);

    console.log(this.quest.teamCap)

    if(this.quest.teamCap) {
      const payload = {
        questCode: this.$route.params.code,
      }

      const teamInfo = await this.faasReadQuestTeams(payload)

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
    },
    async updateTeams() {
      const teamInfo = await this.faasReadQuestTeams({
        questCode: this.$route.params.code
      })

      if (!teamInfo.data) {
        this.teams = [];
      } else {
        this.teams = [teamInfo.data.teams].flat();
      }
    },
    async startGame() {
      const userData = await this.faasReadUser({ uid: this.uid });
      if (userData.data?.user) {
        const teamId = userData.data.user.team;
        await this.faasTeamToNextTask({
          questCode: this.$route.params.code,
          teamUid: teamId,
          nextTaskId: this.tasksList[0],
          startTime: Date.now()
        })

        this.$router.push(`/game/${this.$route.params.code}/${teamId}`)
      } 
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

  &--start {
    margin: 50px auto;
  }
}
</style>