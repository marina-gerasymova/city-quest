<template>
  <div class="login">
    <div class="login__content">
      <h1
        class="login__header"
      >
        Регістрація
      </h1>
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :rules="rules"
          :counter="10"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
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
    </div>
  </div>
</template>
