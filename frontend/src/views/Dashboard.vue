<script lang="ts">

import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/users';
// import axios from 'axios';
import apiService from '../services/api/apiService';
import Navbar from './Navbar.vue';

export default defineComponent({

  components: {
    Navbar, // Register the component
  },
 
  setup(){
    const getUser = ()=>{
     apiService.get('/auth/user');
   };

   const router = useRouter(); 
   const userStore = useUserStore();
   console.log('userStore');
   const logout = () => {
     userStore.clearUser();
     router.push('/');
   };

   return {
     getUser,
     userStore,
     logout    
   };
  }

});

</script>

<template>
  <div>
    
    <Navbar/>
    
    <h1>Dashboard</h1>
    <Counter/>
    <p v-if="userStore.isLoggedIn">Welcome, {{ userStore.currentUser?.name }}!</p>
    <button @click="getUser">getUser</button>
  </div>
</template>


