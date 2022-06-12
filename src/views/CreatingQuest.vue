<template>
  <div class="creating-quest page-size">
    <div
      class="creating-quest__form"
      v-for="(label, index) in labels"
      :key="index"
    >
      <v-text-field
        class="cq-text-input"
        v-model="email"
        :label="label"
        outlined
        required
      ></v-text-field>
    </div>
    <div class="button-wrapper">
      <Button>
        Зберегти
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'CreatingQuest',
  components: {
    Button
  },
  data() {
    return {
      labels: ['Назва квесту', 'Максимальна кількість команд', 'Максимальна кількість учасників в одній команді', 'Місто старту', 'Час старту', 'Вартість']
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

.creating-quest__form {
  width: 100%;
}
</style>
