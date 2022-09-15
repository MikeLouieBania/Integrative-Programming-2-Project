<template>
    <main class="login">
        <section class="form">
            <form class="login">
                <input
                    type="email"
                    placeholder="email"
                    v-v-model="login.email" />

                <input
                    type="password"
                    placeholder="Password"
                    v-v-model="login.password" />

                <input 
                    type="submit" 
                    placeholder="Login" />
            </form>
        </section>

    </main>
</template>

<script>
    import { ref } from 'vue'

   export default {
    setup () {
    const login = ref({});
    const store = useStore();

    return {
        login
    }
    }

   }
    
</script>

<style lang="scss">


</style>