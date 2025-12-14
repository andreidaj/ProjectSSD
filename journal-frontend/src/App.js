import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JournalService from './services/JournalService';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import SearchBar from './components/SearchBar';
import AuthForm from './components/AuthForm';

function App() {
  // Check local storage to see if user was already logged in
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("journalUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = () => {
    JournalService.getAllEntries()
        .then(res => setEntries(res.data))
        .catch(err => console.error("Error connecting to backend:", err));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("journalUser", JSON.stringify(userData)); // Save login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("journalUser");
    setEntries([]);
  };

  // --- Journal Functions ---
  const handleAdd = (entry) => {
    JournalService.createEntry(entry).then(() => loadEntries());
  };

  const handleDelete = (id) => {
    JournalService.deleteEntry(id).then(() => loadEntries());
  };

  const handleSearch = (params) => {
    JournalService.searchEntries(params).then(res => setEntries(res.data));
  };

  // --- Render Logic ---

  // If no user is logged in, show the Login/Register screen
  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  // If user is logged in, show the Journal
  return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold text-dark">📔 My Personal Journal</h1>
          <div>
            <span className="me-3 text-muted">Hello, {user.email}</span>
            <button onClick={handleLogout} className="btn btn-outline-dark btn-sm">Logout</button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <JournalForm onAdd={handleAdd} />
          </div>
          <div className="col-md-7">
            <SearchBar onSearch={handleSearch} onClear={loadEntries} />
            <JournalList entries={entries} onDelete={handleDelete} />
          </div>
        </div>
      </div>
  );
}

export default App;