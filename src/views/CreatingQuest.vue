<template>
  <div class="creating-quest page-size">
    <div
      class="creating-quest__form"
    >
      <v-text-field
        class="cq-text-input"
        v-model="name"
        label="Назва квесту"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="maxCountOfTeams"
        label="Максимальна кількість команд"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="maxCountOfMembers"
        label="Максимальна кількість учасників в одній команді"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="location"
        label="Місто старту"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="time"
        label="Час старту"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="cost"
        label="Вартість"
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
      name: '',
      time: '',
      cost: '',
      location: '',
      maxCountOfMembers: '',
      maxCountOfTeams: '',
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
