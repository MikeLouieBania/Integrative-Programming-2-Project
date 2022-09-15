<template>
    <v-card>
    <v-card-title>LOGIN</v-card-title>
        <v-text-field
            :value="userPassword"
            label="Enter password"
            hint="Your password passed! Password rules are not meant to be broken!"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            :rules="[rules.password]"
            @input="(_) => (userPassword = _)"
        ></v-text-field>
    </v-card>

</template>

<script setup>
</script>

<style lang="scss"></style>
