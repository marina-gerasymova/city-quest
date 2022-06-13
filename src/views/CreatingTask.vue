<template>
  <div class="creating-quest page-size">
    <div
      class="creating-quest__form"
    >
      <v-text-field
        class="cq-text-input"
        v-model="name"
        label="Назва завдання"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="maxCountOfTeams"
        label="Зображення"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="description"
        label="Опис завдання"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="hint"
        label="Підказка"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="time"
        label="Час виконання, хв"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="key"
        label="Відповідь"
        outlined
        required
      ></v-text-field>
    </div>
    <div class="button-wrapper">
      <Button>
        Cтворити завдання
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'CreatingTask',
  components: {
    Button
  },
  data() {
    return {
      name: '',
      imageUrl: '',
      description: '',
      hint: '',
      time: '',
      key: '',
    }
  }
}
</script>

<style lang="scss" scoped>
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
}

.creating-quest__form {
  width: 100%;
}
</style>
