<template>
    <v-card>
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <p><v-btn @click="register">Register</v-btn></p>   
    </v-card>

</template>
  
<script setup>
    import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const email = ref ("");
    const password = ref ("");
    const router = useRouter();

    function register(){
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Register Successfully");
            router.push('/quiz')
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })
    }
</script>
  
  
  