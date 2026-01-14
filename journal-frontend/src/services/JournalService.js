import axios from 'axios';

const API_URL = 'http://localhost:8081/api/journal';
const AI_URL = 'http://localhost:8081/api/ai'; // URL-ul pentru controller-ul AI

class JournalService {

    getAllEntries() {
        return axios.get(API_URL);
    }

    createEntry(entry) {
        return axios.post(API_URL, entry);
    }

    deleteEntry(id) {
        return axios.delete(API_URL + '/' + id);
    }

    searchEntries(params) {
        return axios.get(API_URL + '/search', { params });
    }

    // --- METODA NOUĂ PENTRU AI ---
    getAiSuggestion(category) {
        // Apelăm endpoint-ul din AiController.java
        return axios.get(`${AI_URL}/suggest?category=${category}`);
    }

    register(user) {
        return axios.post('http://localhost:8081/api/auth/register', user);
    }

    login(user) {
        return axios.post('http://localhost:8081/api/auth/login', user);
    }

    // Pentru AI
    getAiSuggestion(category) {
        return axios.get(`${AI_URL}/suggest?category=${category}`);
    }

    // Pentru Profil
    updateProfile(user) {
        return axios.post('http://localhost:8081/api/auth/update', user);
    }
}

export default new JournalService();