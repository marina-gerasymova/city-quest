<template #footer>
  <div class="footer">
    <div
      class="footer__arrow"
      @click="prevPage"
    >
      <span class="material-symbols-outlined">
        arrow_back
      </span>
    </div>
    <div>
      <img :src="Logo" alt="City Quest">
    </div>
    <div class="footer__arrow footer__arrow--opacity">
      <span class="material-symbols-outlined">
        arrow_back
      </span>
    </div>
  </div>
</template>

<script>
import Logo from '@/assets/image/city-quest.svg';

export default {
  name: 'Footer',
  data() {
    return { 
      Logo
    }
  },
  methods: {
    prevPage() {
      console.log(this.$router)
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/utils/mixins";
@import "@/style/utils/colors";

.footer {
  @include flex-between-center;
  width: 100%;
  height: 60px;
  z-index: 2;
  padding: 0 20px;
  background: $color-app-background;

  &__arrow {
    cursor: pointer;

    &--opacity {
      opacity: 0;
      cursor: none;
    }
  }
}
</style>
