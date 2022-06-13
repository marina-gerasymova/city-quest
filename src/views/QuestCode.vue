<template>
  <div class="page-size">
    <div class="title">Введи код до гри</div>
      <div>
        <v-text-field
        class="cq-text-input"
        v-model="code"
        label="Код"
        outlined
        required
      ></v-text-field>
      <div class="button-wrapper">
        <Button
          class="button"
          @button-click="addNewGame"
        >
          Доєднатися
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';

export default {
  name: 'QuestCode',
  components: {
    Button
  },
  data() {
    return {
      code: '',
      faasReadQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
    }
  },
  methods: {
    async addNewGame() {
      if(this.code) {
        console.log('click');
        const result = await this.faasReadQuest({ questCode: this.code.toUpperCase() });
        console.log(result)

        if (!result.data) {
          alert('Квест не знайдено');
          this.code = '';
          this.$store.dispatch('quest/setActiveQuest', null);
          return;
        }

        this.$store.dispatch('quest/setActiveQuest', result.data.quest);
        this.$router.push(`/player-quest-page/${result.data.quest.code}`);
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
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}
</style>