<template>
    <v-card>
    <v-text-field label="Email" v-model="email"></v-text-field>
    <v-text-field label="Password" v-model="password"></v-text-field>
    <v-btn @click="register">Login</v-btn><br><br>
    <v-btn @click="router.push('/register')">Register</v-btn>
    </v-card>
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
  
  
  