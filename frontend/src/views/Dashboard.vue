<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/users';

export default defineComponent({
  setup() {
   
    const router = useRouter();
    const userStore = useUserStore();
    console.log(userStore);
    const logout = () => {
      userStore.clearUser();
      router.push('/');
    };

    return {
      userStore,
      logout,
    };
  },
});
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="userStore.isLoggedIn">Welcome, {{ userStore.currentUser?.name }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>
