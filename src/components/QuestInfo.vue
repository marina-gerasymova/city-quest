<template>
  <div class="quest-info">
    <div class="quest-info__content">
      <div class="quest-info__line">
        <div class="quest-info__title">{{ quest.name }}</div>
      </div>
      <div class="quest-info__line">
        <div class="quest-info__name">Коли:</div>
        <div class="quest-info__value">{{ new Date(quest.time).toLocaleString() }}</div>
      </div>
      <div class="quest-info__line">
        <div class="quest-info__name">Вартість</div>
        <div class="quest-info__value">{{ quest.cost }} грн.</div>
      </div>
      <div class="quest-info__line">
        <div class="quest-info__name">Локація:</div>
        <div class="quest-info__value">{{ quest.address }}</div>
      </div>
    </div>
    <div
      class="quest-info__arrow-wrap"
      @click="$emit('select-quest', quest.code)"
    >
      <span class="material-symbols-outlined ">
        chevron_right
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestInfo",
  props: {
    quest: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/quest-info.scss";
</style>