<template>
  <div class="game-task">
    <div class="game-task__title">name</div>
    <div class="game-task__image-wrap"></div>
    <div class="game-task__description">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
    <v-text-field
      class="cq-text-input"
      v-model="email"
      label="Відповідь"
      outlined
      required
    ></v-text-field>
    <Button class="game-task__button">Відправити</Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'GameTask',
  components: {
    Button
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/game-task.scss";
</style>
