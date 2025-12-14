import React from 'react';

const JournalList = ({ entries, onDelete }) => {
    return (
        <div className="mt-4">
            {entries.length === 0 ? <p className="text-center text-muted">No entries found.</p> : null}

            {entries.map(entry => (
                <div key={entry.id} className="card mb-3 shadow-sm border-0">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title text-primary fw-bold">{entry.title}</h5>
                            <small className="text-muted">{new Date(entry.date).toLocaleDateString()}</small>
                        </div>
                        <div className="mb-2">
                            <span className="badge bg-warning text-dark me-1">{entry.mood}</span>
                            <span className="badge bg-secondary">{entry.tags}</span>
                        </div>
                        <p className="card-text">{entry.content}</p>
                        {entry.mediaUrl && <img src={entry.mediaUrl} alt="memory" className="img-fluid rounded mb-2" style={{maxHeight: '200px'}} />}
                        <br/>
                        <button onClick={() => onDelete(entry.id)} className="btn btn-outline-danger btn-sm mt-2">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JournalList;