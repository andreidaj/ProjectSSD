import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JournalService from './services/JournalService';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import AuthForm from './components/AuthForm';
import Sidebar from './components/Sidebar';
import JournalTypesGrid from './components/JournalTypesGrid';
import ProfileView from './components/ProfileView';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("journalUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('types');
  const [entries, setEntries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (user && (user.uid || user.id)) {
        loadEntries();
    }
  }, [user?.uid, user?.id, activeTab]); // Sincronizare mai precisă

  const loadEntries = () => {
    const userId = user?.uid || user?.id;
    if (userId) {
        JournalService.getAllEntries(userId)
            .then(res => {
                setEntries(res.data);
            })
            .catch(err => console.error("Error connecting to backend:", err));
    }
  };

  // Funcția principală de Login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("journalUser", JSON.stringify(userData));
  };

  // FUNCȚIE NOUĂ: Specială pentru actualizarea profilului fără a reîncărca tot
  const handleUpdateUser = (updatedData) => {
    // Combinăm datele vechi cu cele noi pentru a nu pierde ID-ul sau parola
    const finalUser = { ...user, ...updatedData };
    setUser(finalUser);
    localStorage.setItem("journalUser", JSON.stringify(finalUser));
    console.log("Profile updated in App state:", finalUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("journalUser");
    setEntries([]);
    setActiveTab('types');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setActiveTab('write');
  };

  const handleAddEntry = (entry) => {
    const userId = user?.uid || user?.id;

    if (!userId) {
        alert("Error: No User ID found. Please re-login.");
        return;
    }

    const entryWithUser = {
        ...entry,
        userId: userId
    };

    JournalService.createEntry(entryWithUser)
        .then(() => {
            setTimeout(() => {
                loadEntries();
                setActiveTab('home');
            }, 700);
        })
        .catch(err => {
            console.error("Save error:", err);
        });
  };

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
      <div className="dashboard-container">
        <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            user={user} // Sidebar va primi noul 'user' cu displayName actualizat
        />

        <div className="main-content">
          {activeTab === 'types' && (
              <JournalTypesGrid onSelectCategory={handleCategorySelect} />
          )}

          {activeTab === 'write' && (
              <div className="container" style={{maxWidth: '800px'}}>
                <JournalForm
                    onAdd={handleAddEntry}
                    selectedCategory={selectedCategory}
                    onCancel={() => setActiveTab('types')}
                />
              </div>
          )}

          {activeTab === 'home' && (
              <div className="container">
                <h2 className="mb-4" style={{color: 'white', fontWeight: 'bold'}}>Recent Memories</h2>
                {entries.length === 0 ? (
                    <p style={{color: 'gray'}}>No memories found yet. Start writing!</p>
                ) : (
                    <JournalList entries={entries} onDelete={(id) => {
                      JournalService.deleteEntry(id).then(loadEntries);
                    }} />
                )}
              </div>
          )}

          {activeTab === 'profile' && (
              <ProfileView
                user={user}
                onUpdateUser={handleUpdateUser} // Folosim funcția nouă de update
              />
          )}
        </div>
      </div>
  );
}

export default App;