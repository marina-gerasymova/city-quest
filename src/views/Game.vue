<template>
  <div class="page-size">
    <GameTask />
  </div>
</template>

<script>
import GameTask from "@/components/GameTask.vue";

export default {
  name: 'Game',
  components: {
    GameTask
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/utils/mixins";

.page-size {
  @include flex-column-center-center;
  margin: 0 auto;
  padding: 40px 10px;
}
.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}
</style>