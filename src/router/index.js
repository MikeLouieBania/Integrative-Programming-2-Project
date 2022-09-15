import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BasicMathView from '../views/BasicMathView.vue'
import StringAppView from '../views/StringAppView.vue'
import Dashboard from '../views/Dashboard.vue'
import Vuetify from '../views/Vuetify.vue'
import Quiz from '../views/Quiz.vue'
import Register from '../views/Register.vue'
import Signin from '../views/Signin.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/stringApp',
      name: 'StringAppView',
      component: StringAppView,
      meta: {
        requiresAuth: true,
      }
    },
    {
    path: '/basicMath',
    name: 'basicMath',
    component: BasicMathView,
    meta: {
      requiresAuth: true,
    }
    },
    {
      path: '/vuetify',
      name: 'Vuetify',
      component: Vuetify,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'signin',
      component: Signin
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged (
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
      reject
    )
  })
}

router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if((getAuth) .getCurrentUser) {
      next();
    }
    else {
      alert("You are not Logged In");
      next("/signin");
    }
  }
  else {
    next();
  }
});
export default router
