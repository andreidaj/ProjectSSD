import React, { useState } from 'react';

const SearchBar = ({ onSearch, onClear }) => {
    const [searchType, setSearchType] = useState('mood');
    const [query, setQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let params = {};

        if (searchType === 'date') {
            params.startDate = startDate;
            params.endDate = endDate;
        } else {
            params[searchType] = query; // sets params.mood = 'Happy' etc.
        }

        onSearch(params);
    };

    return (
        <div className="card p-3 mb-4 bg-light">
            <form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap">
                <select className="form-select w-auto" value={searchType} onChange={e => setSearchType(e.target.value)}>
                    <option value="mood">Mood</option>
                    <option value="tag">Tag</option>
                    <option value="date">Date Range</option>
                </select>

                {searchType === 'date' ? (
                    <>
                        <input type="datetime-local" className="form-control w-auto" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                        <input type="datetime-local" className="form-control w-auto" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                    </>
                ) : (
                    <input type="text" className="form-control w-auto" placeholder={`Search by ${searchType}...`} value={query} onChange={e => setQuery(e.target.value)} required />
                )}

                <button type="submit" className="btn btn-primary">Search</button>
                <button type="button" className="btn btn-secondary" onClick={onClear}>Clear</button>
            </form>
        </div>
    );
};

export default SearchBar;