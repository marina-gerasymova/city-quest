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
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: 'CreatingTeam',
  components: {
    Button
  },
  data() {
    return {
      teamName: '',
      faasCreateTeam: httpsCallable(getFunctions(getApp()), 'createTeam'),
      faasReadUser: httpsCallable(getFunctions(getApp()), 'readUser'),
    }
  },
  computed: {
    ...mapGetters({
      uid: 'user/userUid'
    })
  },
  methods: {
    createNewTeam() {
      if(this.teamName) {
        this.createTeam();
      }
    },
    async createTeam() {
      const userData = await this.faasReadUser({ uid: this.uid });
      const payload = {
        user: userData.data.user,
        questCode: this.$route.params.code,
        name: this.teamName
      }

      await this.faasCreateTeam(payload);
      this.$router.push(`/player-quest-page/${this.$route.params.code}`);
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