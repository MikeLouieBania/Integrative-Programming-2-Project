<template>
    <center>
        <v-card class="ma-15" max-width="400">
        <v-card-title>LOGIN</v-card-title>
            <p><input type="email" placeholder="Email" v-model="email" /></p>
            <p><input type="password" placeholder="Password" v-model="password"/></p>
            <v-btn @click="register">Login</v-btn><br><br>
            <v-btn @click="router.push('/register')">Register</v-btn>
        </v-card>
    </center>

</template>
  
<script setup>
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const email = ref ("");
    const password = ref ("");
    const errMsg = ref();
    const router = useRouter();

    const register = () => {
        signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Register Successfully");
            router.push('/dashboard')
        })
        .catch((error) => {
            console.log(error.code);

            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid Email";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "No account was found";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Invalid Password";
                    break;
                default:
                    errMsg.value = "Email or password is incorrect";
                    break;
            }
        })
    }
</script>

<style>

    .ma-15 {
        border-radius: 5%;
    }

    .ma-15 input {
        margin-top: 5%;
        align-items: center;
        width: 100%;
    }
</style>
  
  
  