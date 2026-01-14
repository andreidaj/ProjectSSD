import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JournalService from './services/JournalService';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import JournalTypesGrid from './components/JournalTypesGrid';
import ProfileView from './components/ProfileView';// Componenta noua creata mai sus

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("journalUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('types'); // 'home', 'types', 'profile', 'write'
  const [entries, setEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (user) loadEntries();
  }, [user]);

  const loadEntries = () => {
    JournalService.getAllEntries()
        .then(res => setEntries(res.data))
        .catch(err => console.error("Error connecting to backend:", err));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("journalUser", JSON.stringify(userData));
  };
  const handleUpdateUser = (u) => {
    setUser(u);
    localStorage.setItem("journalUser", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("journalUser");
    setEntries([]);
  };

  // Când dai click pe un card (ex: Travel Journal)
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveTab('write'); // Te duce la pagina de scris
  };

  const handleAddEntry = (entry) => {
    JournalService.createEntry(entry).then(() => {
      loadEntries();
      setActiveTab('home'); // Dupa salvare, mergi la lista
    });
  };

  // --- RENDERING ---

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
      <div className="dashboard-container">
        {/* 1. Sidebar Fix Stanga */}
        <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            userEmail={user.email}
        />

        {/* 2. Zona Principala Dreapta */}
        <div className="main-content">

          {/* VEDERE: JOURNAL TYPES (Gridul din poza) */}
          {activeTab === 'types' && (
              <JournalTypesGrid onSelectCategory={handleCategorySelect} />
          )}

          {/* VEDERE: WRITE NEW ENTRY */}
          {activeTab === 'write' && (
              <div className="container" style={{maxWidth: '800px'}}>
                <JournalForm
                    onAdd={handleAddEntry}
                    selectedCategory={selectedCategory}
                    onCancel={() => setActiveTab('types')}
                />
              </div>
          )}

          {/* VEDERE: HOME (Lista intrarilor recente) */}
          {activeTab === 'home' && (
              <div>
                <h2 className="mb-4" style={{color: 'white', fontWeight: 'bold'}}>Recent Memories</h2>
                {/* Aici poți pune SearchBar-ul dacă vrei */}
                <JournalList entries={entries} onDelete={(id) => {
                  JournalService.deleteEntry(id).then(loadEntries);
                }} />
              </div>
          )}

          {/* VEDERE: PROFILE (Simplu) */}
          {activeTab === 'profile' && (
              <div className="card p-5" style={{backgroundColor: '#1e293b', color: 'white', maxWidth:'600px'}}>
                <h3>My Profile</h3>
                <p>Email: {user.email}</p>
                <button className="btn btn-primary">Change Password</button>
              </div>
          )}
        </div>
      </div>
  );
}

export default App;