import axios from '@/app/services/axios';

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await axios.post('/api/auth/spa/login', {
                email,
                password,
            });
            return response.data[0];
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    logout: async () => {
        try {
            await axios.post('/api/auth/spa/logout');
        } catch (error) {
            console.error("Logout failed", error);
        }
    },

    // Check if the user is already authenticated
    checkAuthStatus: async () => {
        try {
            const response = await axios.get('/api/auth/spa/user');
            return response.data; // Return the user data if authenticated
        } catch (error) {
            return null; // Return null if not authenticated
        }
    }
};

export default AuthService;