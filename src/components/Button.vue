<template #button>
  <div
    class="button"
    @click="$emit('button-click')"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Button',
};
</script>

<style lang="scss" scoped>
@import "@/style/utils/colors";
@import "@/style/utils/mixins";
@import "@/style/utils/variable";

.button {
  width: max-content;
  padding: 11px 20px;
  color: $color-text-blue;
  @include font-size-16px;
  font-weight: bold;
  text-align: center;
  background: $color-button-background;
  border-radius: $border;
  transition: all ease 0.3s;
  cursor: pointer;

  &:hover {
    background: $color-button-hover;
  }
}
</style>
