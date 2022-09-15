<template>
  <nav>
      <v-toolbar app color="rgb(250, 203, 141)">
       <v-app-bar-nav-icon @click='toggleDrawer'></v-app-bar-nav-icon>
      <v-toolbar-title >
        <span class="font-weight-light">MIDTERM PROJECT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="brown"
          v-bind="props"
        >
          MENU
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          router
          :to="item.path" :prepend-icon="item.icon">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

      <v-btn flat color="grey" @click="handleSignout" v-if="isLoggedIn">
        <span>Sign Out</span>
      </v-btn>
      
      
      </v-toolbar>

     <v-navigation-drawer app v-model="drawer" color="rgb(250, 213, 164)">
       <v-list-item
          v-for="item in items"
          :key="item.title"
          router 
          :to="item.path" :prepend-icon="item.icon">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          
        </v-list-item>
      
     </v-navigation-drawer>
  </nav>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const drawer = ref(false)
  const isLoggedIn = ref(false)
  const  items =  ref([
          { title: 'Home', icon: 'mdi-account-circle', path: '/' },
           { title: 'Math', icon: 'mdi-calculator-variant', path: '/basicMath' },
           { title: 'String App', icon: 'mdi-file', path: '/stringApp'},
           { title: 'Vuetify', icon: 'mdi-vuetify', path: '/vuetify'},
           { title: 'Quiz', icon: 'mdi-controller-classic', path: '/quiz'},
           { title: 'About', icon: 'mdi-account-circle', path: '/aboutapp' },
           { title: 'Signin', icon: 'mdi-controller-classic', path: '/signin'},
        ])  
  
  const handleSignout = () => {
    signOut(auth).then(() => {
      router.push('/');
    })
  }

 function toggleDrawer(){
  return drawer.value = !drawer.value
 }

  let auth;
  onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      }
      else {
        isLoggedIn.value = false;
      }
    })
  })
</script>