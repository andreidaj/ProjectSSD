// src/services/JournalService.js
import axios from 'axios';

// This URL must match your Spring Boot Controller
const API_URL = 'http://localhost:8080/api/journal';

class JournalService {

    // Get all entries
    getAllEntries() {
        return axios.get(API_URL);
    }

    // Save a new entry
    createEntry(entry) {
        return axios.post(API_URL, entry);
    }

    // Delete an entry
    deleteEntry(id) {
        return axios.delete(API_URL + '/' + id);
    }

    // Search entries
    searchEntries(params) {
        return axios.get(API_URL + '/search', { params });
    }

    register(user) {
        return axios.post('http://localhost:8080/api/auth/register', user);
    }

    login(user) {
        return axios.post('http://localhost:8080/api/auth/login', user);
    }
}
    
export default new JournalService();