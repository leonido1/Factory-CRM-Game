<template>
    <div class="sign-in">
      <h2>Sign In</h2>
      <form @submit.prevent="signIn">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div class="links">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
         <router-link to="/">Log In</router-link>
    </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/users';
  
  export default defineComponent({
    setup() {
      const email = ref('');
      const password = ref('');
      const username = ref('');
      const userStore = useUserStore();
      const router = useRouter();
      const errorMessage = ref('');
  
      const signIn = async () => {
        const success = await userStore.signIn(email.value, password.value,username.value);
        if (success) {
          alert("You Signned in successfully");
          router.push('/');
        } else {
          errorMessage.value = 'There was a problem signning in';
        }
      };
  
      return {
        email,
        password,
        errorMessage,
        username,
        signIn,
      };
    },
  });
  </script>
  

  <style scoped>
  .sign-in {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    border: none;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  