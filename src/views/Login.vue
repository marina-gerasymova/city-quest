<template>
  <div class="login">
    <div class="login__content">
      <h1
        class="login__header"
      >
        Вхід
      </h1>
      <form>
        <v-text-field
          class="cq-text-input"
          v-model="email"
          label="Електронна пошта"
          outlined
          required
        ></v-text-field>
        <v-text-field
          class="cq-text-input"
          type="password"
          v-model="password"
          label="Пароль"
          outlined
          required
        ></v-text-field>
        <div class="login__button-wrap">
          <Button
            @button-click="submit"
          >
            Увійти
          </Button>
        </div>
      </form>
      <span class="pt15">
        Немає акаунту? 
        <router-link to="/registration" >
          Зареєструватися
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "@/components/Button.vue";

export default {
  name: 'LoginPage',
  components: {
    Button
  },
  data() {
    return {
      email: '',
      password: '',
      auth: null
    }
  },
  mounted() {
    this.auth = getAuth(getApp());
  },
  methods: {
    submit() {
      console.log('submit', this.email, this.password);
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.$store.dispatch('user/setUserUid', user.uid);
          this.$router.push('/role');
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
        });
    }
  }
}
</script>
