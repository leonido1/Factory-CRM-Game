import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/users';
import SignInPage from '../views/Singin.vue'
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
    { path: '/signIn', name:'SignIn',component: SignInPage }
  ,
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (_to, _from, next) => {
      const userStore = useUserStore();
      console.log(userStore.isLoggedIn);
      if (userStore.isLoggedIn) {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
