<template>
  <v-card color="#FFE2B7" class="ma-5 mx-auto mx-auto text-black" max-width="500">
    <v-card-title>Register</v-card-title>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <v-text-field
      label="Name"
      id="name"
      type="text"
      name="name"
      required
      v-model="name"
      class="mt-3"
    ></v-text-field>

    <v-text-field
      label="Email"
      id="email"
      type="email"
      name="email"
      required
      v-model="email"
      class="mt-3"
    ></v-text-field>

    <v-text-field
      label="Password"
      id="password"
      type="password"
      name="password"
      required
      v-model="password"
      class="mt-3"
    ></v-text-field>

    <v-btn block color="#F1BA67" class="primary" @click="Register">
      <button type="submit" class="btn btn-primary">Register</button>
    </v-btn>
  </v-card>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "RegisterComponent",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const store = useStore();
    const router = useRouter();
    const Register = async () => {
      try {
        await store.dispatch("register", {
          email: email.value,
          password: password.value,
          name: name.value,
        });
        router.push("/dashboard");
      } catch (err) {
        error.value = err.message;
      }
    };
    return { Register, name, email, password, error };
  },
};
</script>
