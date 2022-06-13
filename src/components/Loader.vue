<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="pa-3 loader"
  >
    <v-skeleton-loader
      class="mx-auto loader__input"
      type="button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto loader__input"
      type="button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto loader__input"
      type="button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto loader__input"
      type="button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto loader__input"
      type="button"
    ></v-skeleton-loader>
    <v-skeleton-loader
      class="mx-auto loader__input"
      type="button"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
  export default {
    // Vuetify components provide
    // a theme variable that is
    // used to determine dark
    inject: {
      theme: {
        default: { isDark: false },
      },
    },
  }
</script>

<style lang="scss">
.loader {
  width: 100%;
  &.v-sheet.grey.lighten-4 {
    background-color: transparent !important;
  }
}

.v-skeleton-loader__button {
  width: 100% !important;
  margin-bottom: 20px;
}
</style>