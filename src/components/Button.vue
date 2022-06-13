<template #button>
  <div
    class="button"
    :class="{ 'button--disabled': disabled }"
    @click="!disabled && $emit('button-click')"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: Boolean
  }
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

  &--disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  &:hover {
    background: $color-button-hover;
  }
}
</style>
