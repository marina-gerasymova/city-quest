<template>
  <div class="page-size player-quest-page">
    <div class="player-quest-page__title title">
      <div>До початку гри залишилось:</div>
      <div class="player-quest-page__start-time"></div>
    </div>
    <div class="player-quest-page__info">
      <div class="player-quest-page__line">
        <div>Час:</div>
        <div>Hour</div>
      </div>
      <div class="player-quest-page__line">
        <div>Мicце</div>
        <div>Location</div>
      </div>
    </div>
    <div class="player-quest-page__teams">
      <div class="player-quest-page__title">Приєднатися до команди:</div>
      <Team class="player-quest-page__team" />
    </div>
  </div>
</template>

<script>
import Team from "@/components/Team.vue";

export default {
  name: 'PlayerQuestPage',
  components: {
    Team
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/player-quest-page.scss";

.page-size {
  margin: 40px auto;
}
.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}
</style>