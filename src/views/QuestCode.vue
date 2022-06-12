<template>
  <div class="page-size">
    <div class="title">Введи код до гри</div>
      <div>
        <v-text-field
        class="cq-text-input"
        v-model="code"
        label="Код"
        outlined
        required
      ></v-text-field>
      <div class="button-wrapper">
        <Button
          class="button"
          @click="addNewGame"
        >
          Доєднатися
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'QuestCode',
  components: {
    Button
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