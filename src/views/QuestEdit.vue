<template>
  <div class="creating-quest page-size">
    <div class="creating-quest__form">
      <v-text-field
        class="cq-text-input"
        v-model="name"
        label="Назва квесту"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="maxCountOfTeams"
        label="Максимальна кількість команд"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="maxCountOfMembers"
        label="Максимальна кількість учасників в одній команді"
        outlined
        required
      ></v-text-field>
      <v-text-field
        class="cq-text-input"
        v-model="location"
        label="Локація старту"
        outlined
        required
      ></v-text-field>
      <input
        class="v-input cq-text-input theme--light v-text-field v-text-field--is-booted v-text-field--enclosed v-text-field--outlined"
        style="width: 100%; border: 1px solid #fff; height: 40px; margin-bottom: 16px; align-items: center; padding-left: 10px; padding-right: 10px;"
        type="datetime-local"
        v-model="time"
      >
      <v-text-field
        class="cq-text-input"
        v-model="cost"
        label="Вартість"
        outlined
        required
      ></v-text-field>
    </div>
    <div class="button-wrapper">
      <Button
        :disabled="!isValidForm"
        @button-click="updateQuest"
      >
        Зберегти
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapGetters } from "vuex";

export default {
  name: 'QuestEdit',
  components: {
    Button
  },
  data() {
    return {
      name: '',
      time: '',
      cost: '',
      location: '',
      maxCountOfMembers: '',
      maxCountOfTeams: '',
      readQuest: httpsCallable(getFunctions(getApp()), 'readQuest'),
      faasUpdateQuest: httpsCallable(getFunctions(getApp()), 'updateQuest'),
    }
  },
  computed: {
    ...mapGetters({
      activeQuest: 'quest/activeQuest',
      hostId: 'user/userUid'
    }),
    isValidForm() {
      return this.name && this.time && this.cost &&
        this.maxCountOfMembers && this.maxCountOfTeams &&
        this.location;
    }
  },
  async mounted() {
    const questData = await this.readQuest({ questCode: this.$route.params.code });
    this.$store.dispatch('quest/setActiveQuest', questData.data.quest);
    this.name = this.activeQuest.name;
    this.time = this.activeQuest.time;
    this.cost = this.activeQuest.cost;
    this.location = this.activeQuest.address;
    this.maxCountOfMembers = this.activeQuest.teamCap,
    this.maxCountOfTeams = this.activeQuest.teamsNum
  },
  methods: {
    async updateQuest() {
      const payload = {
        code: this.activeQuest.code,
        uid: this.hostId,
        name: this.name,
        teamsNum: this.maxCountOfTeams,
        teamCap: this.maxCountOfMembers,
        address: this.location,
        time: +new Date(this.time),
        cost: this.cost,
        teams: this.activeQuest.teams,
        tasks: this.activeQuest.tasks
      }
      await this.faasUpdateQuest(payload);

      this.$router.push(`/quest-org-info/${this.$route.params.code}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.page-size {
  margin: 0 auto;
  padding: 40px 0;
}

.button {
  width: 100%;
  margin: 20px auto;

  &-wrapper {
    width: 100%;
  }
}

.creating-quest__form {
  width: 100%;
}
</style>
