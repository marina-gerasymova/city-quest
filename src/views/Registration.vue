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
          class="cq-text-input"
          v-model="name"
          label="Ім'я"
          outlined
          required
        ></v-text-field>
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
          :counter="8"
          label="Пароль"
          outlined
          required
        ></v-text-field>
        <div class="login__button-wrap">
          <Button
            @button-click="submit"
          >
            Зареєструватися
          </Button>
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
import Button from "@/components/Button.vue";

export default {
  name: 'RegistrationPage',
  components: {
    Button
  },
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
          this.$router.push('/role');
          
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
        name: name,
        email: email,
        userId
      });

      this.$store.dispatch('user/setUserUid', userId);
    }
  }
}
</script>