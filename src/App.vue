<template>
   <v-app>
    <v-main>
       <Navbar/>
       <router-view></router-view>
    </v-main>
   </v-app>
</template>

<script setup>
  import Navbar from '@/components/NavBar.vue';
</script>


<style>
main {
  background-color: rgb(250, 235, 215);
}
</style>
