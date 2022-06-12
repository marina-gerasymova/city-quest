<template>
  <div class="quest-info">
    <div class="quest-info__content">
      <div class="quest-info__line">
        <div class="quest-info__title">{{ title }}</div>
      </div>
      <div class="quest-info__line">
        <div class="quest-info__name">Коли:</div>
        <div class="quest-info__value">{{ time }}</div>
      </div>
      <div class="quest-info__line">
        <div class="quest-info__name">Вартість</div>
        <div class="quest-info__value">{{ cost }} грн.</div>
      </div>
      <div class="quest-info__line">
        <div class="quest-info__name">Місто:</div>
        <div class="quest-info__value">{{ location }}</div>
      </div>
    </div>
    <div
      class="quest-info__arrow-wrap"
      @click="$emit(select-game)"
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
    title: {
      type: String,
      default: () => 'Name'
    },
    time: {
      type: String,
      default: () => 'time'
    },
    cost: {
      type: Number,
      default: () => '0'
    },
    location: {
      type: String,
      default: () => 'location'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/quest-info.scss";
</style>