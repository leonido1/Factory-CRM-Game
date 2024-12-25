import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
  }),
  persist: {
    storage: localStorage
  }, 
   getters: {
    isLoggedIn: (state) => !!state.currentUser,
  },
  actions: {
    async signIn(email: string, password: string,username:string): Promise<boolean>{
      console.log(email,password,username);
      
      try {
        await axios.post('http://localhost:3000/auth/signup', {
          email,
          password,
          name:username
        });
      } catch (error) {
        console.error('Login failed', error);
        return false;
      }      
      
      return true;
    },

    async login(email: string, password: string): Promise<boolean> {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email,
          password,
        });
        this.currentUser = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.currentUser?.token}`;
        return true;
      } catch (error) {
        console.error('Login failed', error);
        return false;
      }
    },
    clearUser() {
      this.currentUser = null;
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  
});
