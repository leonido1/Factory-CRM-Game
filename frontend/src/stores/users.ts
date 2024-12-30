import { defineStore } from 'pinia';
// import axios from 'axios';
import apiService from '../services/api/apiService';

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
        await apiService.post('/auth/signup', {
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
        const response = await apiService.post('/auth/login', {
          email,
          password,
        });
        console.log(response,'response');
        this.currentUser = response.data;
        apiService.defaults.headers.common['Authorization'] = `Bearer ${this.currentUser?.token}`;
  
       
        return true;
      } catch (error) {
        console.error('Login failed', error);
        return false;
      }
    },
    clearUser() {
      this.currentUser = null;
      delete apiService.defaults.headers.common['Authorization'];
    },
  },
  
});
