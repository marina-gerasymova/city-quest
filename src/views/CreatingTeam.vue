<template>
  <div class="page-size">
    <div class="title">Назва команди</div>
    <div class="wrapper">
        <v-text-field
        class="cq-text-input"
        v-model="teamName"
        label="Назва"
        outlined
        required
      ></v-text-field>
      <div class="button-wrapper">
        <Button
          class="button"
          @button-click="createNewTeam"
        >
          Створити
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'CreatingTeam',
  components: {
    Button
  },
  data() {
    return {
      teamName: '',
    }
  },
  methods: {
    createNewTeam() {
      if(this.teamName) {
        this.$router.push('/player-quest-page');
      }
    }
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
  margin: 20px   auto;

  &-wrapper {
    width: 100%;
  }
}

.wrapper {
  width: 100%;
}
</style>