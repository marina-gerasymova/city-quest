<template>
  <div class="login">
    <div class="login__content">
      <h1
        class="login__header"
      >
        Реєстрація
      </h1>
      <form>
        <v-text-field
          v-model="name"
          :counter="10"
          label="Name"
          required
        ></v-text-field>
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
            Зареєструватися
          </v-btn>
        </div>
      </form>
      <span class="pt15">
        Вже є акаунт? 
        <router-link to="/login" >
          Увійти
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { getApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'RegistrationPage',
  data() {
    return {
      name: '',
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
      console.log('submit', this.name, this.email, this.password);
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;

          this.writeUserData(user.uid, this.name, this.email);

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
        });

    },
    writeUserData(userId, name, email) {
      const db = getDatabase();
      set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
        userId
      });
    }
  }
}
</script>