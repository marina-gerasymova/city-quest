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
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
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
    </div>
  </div>
</template>
