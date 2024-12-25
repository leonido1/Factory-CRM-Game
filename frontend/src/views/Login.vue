<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/users';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const userStore = useUserStore();
    const router = useRouter();
    const errorMessage = ref('');

    const login = async () => {
      const success = await userStore.login(email.value, password.value);
      if (success) {
        router.push('/dashboard');
      } else {
        errorMessage.value = 'Invalid credentials. Please try again.';
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
});
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  
    <div class="links">
         <router-link to="/signIn">sign in</router-link>
    </div>
  
  </div>
</template>
