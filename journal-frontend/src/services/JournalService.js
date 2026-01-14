import axios from 'axios';

const API_URL = 'http://localhost:8081/api/journal';
const AI_URL = 'http://localhost:8081/api/ai';
const AUTH_URL = 'http://localhost:8081/api/auth'; // Am creat o constantă pentru auth

class JournalService {

    getAllEntries(userId) {
        return axios.get(`${API_URL}/user/${userId}`);
    }

    createEntry(entry) {
        return axios.post(API_URL, entry);
    }

    deleteEntry(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    searchEntries(userId, mood) {
        return axios.get(`${API_URL}/search`, {
            params: { userId, mood }
        });
    }

    getAiSuggestion(category) {
        return axios.get(`${AI_URL}/suggest?category=${category}`);
    }

    register(user) {
        return axios.post(`${AUTH_URL}/register`, user);
    }

    login(user) {
        return axios.post(`${AUTH_URL}/login`, user);
    }

    updateProfile(user) {
        return axios.post(`${AUTH_URL}/update`, user);
    }

    updatePassword(userId, oldPassword, newPassword) {
        return axios.post(`${AUTH_URL}/change-password`, {
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    }
}

export default new JournalService();