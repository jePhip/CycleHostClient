<template>
  <div style="display: flex; justify-content: center">
    <v-btn @click="logout" flat>Logout</v-btn>
  </div>
  <v-row justify="center">
    <v-col cols="3">
      <v-form class="form" @submit.prevent="submit">
        <h1>Login</h1>
        <v-text-field
          label="Username"
          variant="outlined"
          v-model="username"
          :rules="inputRules"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          variant="outlined"
          v-model="password"
          :rules="inputRules"
          required
        ></v-text-field>
        <v-btn type="submit" flat>Submit</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, reactive } from "vue";
let username = ref("");
let password = ref("");

let inputRules = reactive([
  (v) => v.length > 0 || "Please add a value to this field",
]);

let signup = async () => {

  let up = {
    username: "bob",
    password: "dillan",
  };
  let reponse = await fetch(
    `https://cloudbuildinst-dn4hl3ql4q-uc.a.run.app/v1/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(up),
    }
  );
};
let login = async () => {
  let up = {
    username: username.value,
    password: password.value,
  };
  let response = await fetch(
    `https://cloudbuildinst-dn4hl3ql4q-uc.a.run.app/v1/auth/login`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(up),
    }
  );
  const headers = response.headers;
  console.log(headers);
  response = await response.json();
  const cookies = document.cookie;

  // Log the headers or access specific header values
  console.log("All headers:", headers);
  console.log("Received Cookies:", cookies);
  console.log(response);
};
let logout = async () => {
  let response = await fetch(
    `https://cloudbuildinst-dn4hl3ql4q-uc.a.run.app/v1/auth/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
  response = await response.json();
  console.log(response);
};
let submit = () => {
  console.log(username.value, password.value);
  login();
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
