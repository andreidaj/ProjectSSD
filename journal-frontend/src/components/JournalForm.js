import React, { useState, useEffect } from 'react';
import JournalService from '../services/JournalService'; // Importăm serviciul
import { FaRobot, FaMagic } from 'react-icons/fa'; // Iconițe noi

const JournalForm = ({ onAdd, selectedCategory, onCancel }) => {
    const [entry, setEntry] = useState({
        title: '', content: '', mood: '', tags: selectedCategory || '', mediaUrl: ''
    });
    const [loadingAi, setLoadingAi] = useState(false);

    // Dacă deschidem "AI Journal", putem încărca automat o sugestie (opțional)
    // Sau lăsăm utilizatorul să dea click pe buton.

    const handleChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });

    // Funcția care cheamă AI-ul
    const handleGetSuggestion = () => {
        setLoadingAi(true);
        // Cerem o sugestie bazată pe categoria selectată (ex: Travel, Daily, AI)
        JournalService.getAiSuggestion(selectedCategory || 'General')
            .then(res => {
                // Backend-ul returnează un String simplu, îl punem în content
                setEntry(prev => ({
                    ...prev,
                    content: prev.content + (prev.content ? '\n\n' : '') + "🤖 Idee AI:\n" + res.data
                }));
                setLoadingAi(false);
            })
            .catch(err => {
                console.error("AI Error:", err);
                setLoadingAi(false);
                alert("Nu am putut contacta AI-ul. Verifică dacă backend-ul rulează.");
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(entry);
    };

    return (
        <div className="card p-4 shadow-lg border-0" style={{backgroundColor: '#1e293b', color: 'white'}}>
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <h4 className="m-0">
                    New Entry: <span className="text-primary">{selectedCategory || 'General'}</span>
                </h4>
                <button onClick={onCancel} className="btn btn-sm btn-outline-light">Back</button>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    className="form-control mb-3 dark-input"
                    placeholder="Title"
                    value={entry.title}
                    onChange={handleChange}
                    required
                />

                <div className="position-relative mb-3">
                    <textarea
                        name="content"
                        className="form-control dark-input"
                        placeholder={loadingAi ? "AI-ul se gândește..." : "Write your story..."}
                        rows="6"
                        value={entry.content}
                        onChange={handleChange}
                        required
                        disabled={loadingAi}
                    />

                    {/* Butonul AI - Apare peste textarea sau sub el */}
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-info position-absolute bottom-0 end-0 m-2"
                        onClick={handleGetSuggestion}
                        disabled={loadingAi}
                        title="Cere o idee de la AI"
                    >
                        {loadingAi ? 'Thinking...' : <><FaMagic /> Suggest AI</>}
                    </button>
                </div>

                <div className="row g-2 mb-3">
                    <div className="col">
                        <input name="mood" className="form-control dark-input" placeholder="Mood" value={entry.mood} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <input name="tags" className="form-control dark-input" placeholder="Tags" value={entry.tags} onChange={handleChange} />
                    </div>
                </div>

                <input name="mediaUrl" className="form-control mb-4 dark-input" placeholder="Image URL (Optional)" value={entry.mediaUrl} onChange={handleChange} />

                <button type="submit" className="btn btn-primary w-100 p-2 fw-bold">Save Entry</button>
            </form>
        </div>
    );
};

export default JournalForm;