<template>
  <div class="page-size">
    <div class="title">Хто ти в цій грі?</div>
    <div class="button-wrapper">
      <Button 
        class="button"
        @button-click="selectPlayer"
      >
        Учасник
      </Button>
      <Button
        class="button"
        @button-click="selectOrganizator"
      >
        Організатор
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'SelectingPole',
  components: {
    Button
  },
  methods: {
    selectPlayer() {
      this.$store.dispatch('user/setUserRole', 'player');
      this.$router.push('/select-quest');
    },
    selectOrganizator() {
      this.$store.dispatch('user/setUserRole', 'host');
      this.$router.push('/select-quest-org')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/style/utils/mixins";

.page-size {
  @include flex-column-center-center;
  margin: 0 auto;
}
.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}
</style>