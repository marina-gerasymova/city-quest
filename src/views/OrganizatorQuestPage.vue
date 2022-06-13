<template>
  <div class="quest-full-info page-size">
    <div class="quest-full-info__title">
      <div>name</div>
      <div>
        <span class="material-symbols-outlined">
          settings
        </span>
      </div>
    </div>
    <div class="quest-full-info__content">
      <div
        class="quest-full-info__line"
        v-for="row in info"
        :key="row.label"
      >
        <div class="quest-full-info__label">{{ row.label }}</div>
        <div class="quest-full-info__value">{{ row.value }}</div>
      </div>
    </div>
    <div class="quest-full-info__tasks">
      <div class="quest-full-info__label">Завдання:</div>
      <Task />
      <div class="button-wrapper">
        <Button
          @button-click="createNewTask"
        >
          Створити завдання
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import Button from "@/components/Button.vue";

export default {
  name: "OrganizatorQuestPage",
  components: {
    Task,
    Button
  },
  data() {
    return {
      info: [
        {
          label: 'До початку залишилось:',
          value: '',
        },
        {
          label: 'Кількість команд:',
          value: '',
        },
        {
          label: 'Кількість учасників:',
          value: '',
        },
        {
          label: 'Місто старту:',
          value: '',
        },
        {
          label: 'Вартість:',
          value: '',
        },
        {
          label: 'Код квесту:',
          value: '',
        }
      ]
    }
  },
  methods: {
    createNewTask() {
      this.$router.push('/creating-task');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/organizator-quest-page.scss";

.page-size {
  margin: auto;
  padding: 40px 0;
}

.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}

</style>
