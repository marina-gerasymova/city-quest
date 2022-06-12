<template>
  <div class="team">
    <div class="team__title">TITLE</div>
    <div class="team__list">
      <div
        class="team__person"
        v-for="(person, index) in team"
        :key="person.id"
      >
        {{ index }}. {{ person.name }}
      </div>
    </div>
    <div class="team__button">
      <Button
        class="button"
      >
        Приєднатися
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "Team",
  components: {
    Button
  },
  props: {
    team: {
      type: Array,
      default: () => {
        return [
          {
            name: 'Maryna',
            id: '1',
          },
          {
            name: 'Daniil',
            id: '2'
          }
        ]
      },
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.team {
  width: 100%;
  font-size: 14px;

  &__title {
    margin-bottom: 5px;
    text-align: center;
  }
  
  &__person {
    margin-bottom: 5px;
  }

  &__button {
    width: 100%;
    margin: 10px auto 0;
  }

  .button { 
    margin: 0 auto;
    font-size: 12px;
  }
}
</style>
