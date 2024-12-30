<template>
  <div>
    <Navbar/>

    <h1>All Users</h1>
    <table v-if="users.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No users found.</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
//import axios from 'axios';
import apiService from '../services/api/apiService'
import Navbar from './Navbar.vue';


export default defineComponent({
  name: 'UserList',
  components: {
    Navbar, // Register the component
  },

  setup() {
    // Reactive state
    const users = ref([]);
    const error = ref(null);

    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await apiService.get('/users');
        users.value = response.data;
      } catch (err) {
        error.value = 'Failed to load users.';
        console.error(err);
      }
    };

    // Call fetchUsers when the component is mounted
    onMounted(() => {
      fetchUsers();
    });

    // Return data and methods for the template to access
    return {
      users,
      error,
    };
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}
</style>
