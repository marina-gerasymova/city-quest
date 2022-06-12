<template>
  <div class="page-size">
    <div class="title">Вибери квест</div>
    <QuestInfo
      :title="title"
      :time="time"
      :location="location"
      :cost="cost"
    >
    </QuestInfo>
    <div class="button-wrapper">
      <Button
        class="button"
        @button-click="addNewGame"
      >
        Доєднатися до нової гри
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import QuestInfo from "@/components/QuestInfo.vue";

export default {
  name: 'SelectingQuest',
  components: {
    Button,
    QuestInfo
  },
  methods: {
    addNewGame() {
      console.log('click')
      this.$router.push('/new-quest');
    }
  }
}
</script>

<style lang="scss" scoped>
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