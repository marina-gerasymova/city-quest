<template>
  <div class="page-size">
    <div class="title">Хто ти в цій грі?</div>
    <div class="button-wrapper">
      <Button class="button">
        Учасник
      </Button>
      <Button class="button">
        Організатор
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: 'LoginPage',
  components: {
    Button
  },
}
</script>

<style lang="scss" scoped>
.page-size {
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