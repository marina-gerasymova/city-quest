<template>
  <div class="task">
    <div
      class="task__title"
      @click="open = !open"
    >
      <div class="task__number">Завдання №1</div>
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
        
      </div>
      <div
        class="task__row"
        v-for="row in task"
        :key="row.label"
      >
        <div class="task__sign">{{ row.label }}</div>
        <div class="task__answer">{{ row.key }}</div>
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
  data() {
    return {
      open: false,
      task: [
        {
          label: 'Завдання: ',
          key: 'sdfghj',
        },
        {
          label: 'Підказка: ',
          key: 'asdfgh',
        },
        {
          label: 'Час на виконання: ',
          key: 'asdfg',
        },
        {
          label: 'Відповідь: ',
          key: 'asdfg',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/components/task.scss";
</style>
