<template>
    <center>
        <v-card class="ma-15" max-width="400">
        <v-card-title>REGISTER</v-card-title>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <v-btn @click="register">Register</v-btn>
        </v-card>
    </center>

</template>
  
<script setup>
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const email = ref ("");
    const password = ref ("");
    const router = useRouter();

    const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Register Successfully");
            router.push('/signin')
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
    }
</script>

<style>

    .ma-15 {
        border-radius: 5px;
    }

    .ma-15 input {
        margin-top: 5%;
        margin-bottom: 3%;
        align-items: center;
        width: 100%;
    }
</style>