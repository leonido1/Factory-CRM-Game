<template>

<nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <ul class="navbar-links">
      <li><router-link to="/users">Users</router-link></li>
      <li>    <button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/users';
// import axios from 'axios';

export default defineComponent({

  
  setup()  {
   console.log('sdsdsdds');
  
    const router = useRouter();
    const userStore = useUserStore();
    // console.log(userStore);
    const logout = () => {
      userStore.clearUser();
      router.push('/');
    };

    return {
      logout,
    };
  },
});
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.navbar-logo {
  font-size: 1.5rem;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar-links li {
  padding: 10px;
}

.navbar-links li a {
  text-decoration: none;
  color: white;
}

.navbar-links li a:hover {
  color: #3498db;
}
</style>