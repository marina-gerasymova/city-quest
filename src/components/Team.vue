<template>
  <div v-if="team" class="team">
    <div class="team__title">{{ team.name }}</div>
    <div class="team__list">
      <div
        class="team__person"
        v-for="(person, index) in Object.values(team.players || {})"
        :key="person.userId"
      >
        {{ index + 1 }}. {{ person.name }}
      </div>
    </div>
    <div class="team__button">
      <Button
        class="button"
        :class="{ 'button--red': isMember }"
        @button-click="handleUserActionWithTeam"
      >
        {{ buttonText }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from 'firebase/app';
import { mapGetters } from 'vuex';

export default {
  name: "Team",
  components: {
    Button
  },
  props: {
    team: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      faasGetTeamInfo: httpsCallable(getFunctions(getApp()), 'getTeamInfo'),
      faasJoinTeam: httpsCallable(getFunctions(getApp()), 'joinTeam'),
      faasLeaveTeam: httpsCallable(getFunctions(getApp()), 'leaveTeam'),
      faasReadUser: httpsCallable(getFunctions(getApp()), 'readUser'),
    }
  },
  computed: {
    ...mapGetters({
      userId: 'user/userUid'
    }),
    isMember() {
      console.log(Object.keys(this.team), this.userId)
      return Object.keys(this.team.players || {}).includes(this.userId);
    },
    buttonText() {
      return this.isMember ? 'Вийти' : 'Приєднатися';
    }
  },
  mounted() {
    // this.getTeamInfo();
  },
  methods: {
    async getTeamInfo() {
      const payload = {
        questCode: this.$route.params.code,
        teamUid: this.team.uid
      }

      const teamData = await this.faasGetTeamInfo(payload);
      this.team = teamData.data.team;
      console.log(this.team);
    },
    async handleUserActionWithTeam() {
      if (this.isMember) {
        await this.faasLeaveTeam({
          teamUid: this.team.uid,
          questCode: this.$route.params.code,
          userUid: this.userId
        })
      } else {
        const userData = await this.faasReadUser({
          uid: this.userId
        });

        await this.faasJoinTeam({
          teamUid: this.team.uid,
          questCode: this.$route.params.code,
          user: userData.data.user
        })
      }

      await this.getTeamInfo();
    }
  }
}
</script>

<style lang="scss" scoped>
.team {
  width: 100%;
  font-size: 14px;

  &__title {
    margin-bottom: 5px;
    text-align: center;
  }
  
  &__person {
    margin-bottom: 5px;
  }

  &__button {
    width: 100%;
    margin: 10px auto 0;
  }

  .button { 
    margin: 0 auto;
    font-size: 12px;
  }
}
</style>
