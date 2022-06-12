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
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <div class="login__button-wrap">
          <v-btn
            class="login__button button"
            color="primary"
            @click="submit"
          >
            Увійти
          </v-btn>
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

export default {
  name: 'LoginPage',
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
