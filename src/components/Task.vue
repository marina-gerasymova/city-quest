<template>
  <div class="task">
    <div
      class="task__title"
      @click="open = !open"
    >
      <div class="task__number">{{ task.name }}</div>
      <div
        class="task__icon"
        :class="{
          'task__icon--bottom': open
        }"
      >
        <span class="material-symbols-outlined">
          chevron_right
        </span>
      </div>
    </div>
    <div
      v-if="open"
      class="task__content"
    >
      <div class="task__image">
        <img :src="task.imgUrl" alt="">
      </div>
      <div
        class="task__row"
        v-for="row in taskInfo"
        :key="row.label"
      >
        <div class="task__sign">{{ row.label }}</div>
        <div class="task__answer">{{ task[row.key] }}</div>
      </div>
      <div class="task__editing">
        <div class="task__answer">Редагувати квест</div>
        <div class="task__icon">
          <span class="material-symbols-outlined material-symbols-outlined--18">
            edit
          </span>
        </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false,
      taskInfo: [
        {
          label: 'Завдання: ',
          key: 'description',
        },
        {
          label: 'Підказка: ',
          key: 'hint',
        },
        {
          label: 'Час на виконання: ',
          key: 'time',
        },
        {
          label: 'Відповідь: ',
          key: 'key',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/task.scss";
</style>
