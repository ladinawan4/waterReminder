import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const register = async (username, email, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  };