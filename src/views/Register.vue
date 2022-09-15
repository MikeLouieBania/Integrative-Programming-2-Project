<template>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><v-btn @click="register">Register</v-btn></p>
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
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
    }
</script>