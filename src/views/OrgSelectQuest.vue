<template>
  <div class="page-size">
    <div class="title">Вибери квест</div>
    <QuestInfo
      v-for="quest in quests"
      :key="quest.code"
      :quest="quest"
      @select-quest="goToDetailedQuest"
    />
    <div class="button-wrapper">
      <Button
        class="button"
        @button-click="addNewGame"
      >
        Створити новий квест
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import QuestInfo from "@/components/QuestInfo.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapGetters } from "vuex";

export default {
  name: 'SelectingQuest',
  components: {
    Button,
    QuestInfo
  },
  data() {
    return {
      quests: [],
      faasGetUserQuests: httpsCallable(getFunctions(getApp()), 'readUserQuests'),
    }
  },
  computed: {
    ...mapGetters({
      uid: 'user/userUid'
    })
  },
  async mounted() {
    const result = await this.faasGetUserQuests({ uid: this.uid });
    this.quests = result?.data?.quests || [];
  },
  methods: {
    addNewGame() {
      console.log('click')
      this.$router.push('/creating-quest');
    },
    goToDetailedQuest(code) {
      this.$router.push(`/quest-org-info/${code}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.page-size {
  margin: auto;
  padding: 40px 0;
}
.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}
</style>