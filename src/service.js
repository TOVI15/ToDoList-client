import axios from 'axios';

// const apiUrl = "http://localhost:5216"; 
axios.defaults.baseURL = process.env.REACT_APP_SERVER;
// const apiClient = axios.create({ baseURL: apiUrl});

axios.interceptors.response.use(
  response => response,  
  error => {
    console.error("API request error:", error.response ? error.response.data : error.message);
    return Promise.reject(error); 
  }
);

const apiService = {

  getTasks: async () => {
    try {
      const result = await axios.get('/items');
      return result.data;  
    } catch (error) {
      throw error;  
    }
  },

  addTask: async (name) => {
    await axios.post(`/items`, { name: name, isComplete: false });
  },

  setCompleted: async (id, isComplete) => {
    try {

      const result = await axios.put(`/items/${id}`, {name: " ", isComplete: isComplete}); // לא בתוך אובייקט, ישירות
      return result.data;
    } catch (error) {
      console.error("API request error:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/items/${id}`);
      return { message: 'Task deleted successfully' }; 
    } catch (error) {
      throw error;  
    }
  }
};


export default apiService;
