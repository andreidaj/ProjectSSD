import React, { useState } from 'react';

const JournalForm = ({ onAdd }) => {
    const [entry, setEntry] = useState({
        title: '', content: '', mood: '', tags: '', mediaUrl: ''
    });

    const handleChange = (e) => setEntry({ ...entry, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(entry);
        setEntry({ title: '', content: '', mood: '', tags: '', mediaUrl: '' }); // Clear form
    };

    return (
        <div className="card p-3 shadow-sm">
            <h4 className="mb-3">New Memory</h4>
            <form onSubmit={handleSubmit}>
                <input name="title" className="form-control mb-2" placeholder="Title" value={entry.title} onChange={handleChange} required />
                <textarea name="content" className="form-control mb-2" placeholder="How was your day?" rows="3" value={entry.content} onChange={handleChange} required />

                <div className="row g-2 mb-2">
                    <div className="col"><input name="mood" className="form-control" placeholder="Mood (e.g. Happy)" value={entry.mood} onChange={handleChange} /></div>
                    <div className="col"><input name="tags" className="form-control" placeholder="Tags (Work, Travel)" value={entry.tags} onChange={handleChange} /></div>
                </div>

                <input name="mediaUrl" className="form-control mb-3" placeholder="Image URL (Optional)" value={entry.mediaUrl} onChange={handleChange} />
                <button type="submit" className="btn btn-success w-100">Add Entry</button>
            </form>
        </div>
    );
};

export default JournalForm;