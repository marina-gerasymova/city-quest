<template>
  <div v-if="teams" class="page-size player-quest-page">
    <div class="player-quest-page__title title">
      <div class="player-quest-page__title">{{ quest.name }}</div>
      <div>Таблиця результатів:</div>
    </div>
    <div class="player-quest-page__info">
      <div
        class="player-quest-page__line"
        v-for="(team, i) in teams"
        :key="team.uid"
      >
        <div>{{ i + 1 }}. {{ team.name }}</div>
        <div>{{ formatTime(team.end - team.start) }}</div>
      </div>
    </div>
  </div>
  <div v-else class="page-size">
    <Loader />
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapGetters } from 'vuex';
import { formatTime } from "@/helpers/questTimer.js";


export default {
  name: 'QuestEnd',
  components: {
    Loader
  },
  data() {
    return {
      formatTime,
      teams: null,
      faasReadQuestTeams: httpsCallable(getFunctions(getApp()), 'readQuestTeams'),
      getTeamInfo: httpsCallable(getFunctions(getApp()), 'readQuestTeams'),
    }
  },
  computed: {
    ...mapGetters({
      quest: 'quest/activeQuest'
    })
  },
  async mounted() {
    const teamData = await this.faasReadQuestTeams({
      questCode: this.$route.params.code
    });

    if (teamData.data) {
      this.teams = teamData.data.teams.filter(team => team.progress == 1);
    }

    console.log(teamData);
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

  &--start {
    margin: 50px auto;
  }
}
</style>