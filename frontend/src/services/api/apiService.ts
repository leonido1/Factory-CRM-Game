import axios from 'axios';


console.log('Refresh Two',this,'dalalae');
      

const apiService = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // To include cookies in requests
});
console.log('axiosInstance');
// Request interceptor to attach access token
apiService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for refresh token
apiService.interceptors.response.use(
  response => response,
  async (error) => {
    console.log('interceptors 22',error.response.data);
    if (error.response.status === 401 && error.response.data.message === 'Invalid token') {
      try {
        console.log('xxxxxxxxxxxx');
        const refreshResponse = await apiService.post('/auth/refresh');
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // Retry the failed request with the new token
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiService(error.config);
      } catch (refreshError) {
        console.error('Refresh token expired or invalid');
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;