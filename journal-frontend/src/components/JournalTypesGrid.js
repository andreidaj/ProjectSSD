import React from 'react';
// IMPORTAM FaRobot PENTRU AI JOURNAL
import { FaPlane, FaUtensils, FaLightbulb, FaHeartbeat, FaPencilAlt, FaDumbbell, FaRobot } from 'react-icons/fa';

const categories = [
    { id: 'travel', name: 'Travel Journal', icon: <FaPlane /> },
    { id: 'recipe', name: 'Recipe Journal', icon: <FaUtensils /> },
    { id: 'daily', name: 'Daily Journal', icon: <FaPencilAlt /> },
    { id: 'ideas', name: 'Ideas Journal', icon: <FaLightbulb /> },
    { id: 'fitness', name: 'Fitness Journal', icon: <FaDumbbell /> },
    { id: 'health', name: 'Health Journal', icon: <FaHeartbeat /> },
    // AICI ESTE NOUL TIP DE JURNAL
    { id: 'ai', name: 'AI Journal', icon: <FaRobot /> },
];

const JournalTypesGrid = ({ onSelectCategory }) => {
    return (
        <div>
            <h2 className="mb-4" style={{color: 'white', fontWeight: 'bold'}}>Journal Types</h2>
            <div className="journal-grid">
                {categories.map((cat) => (
                    <div key={cat.id} className="journal-card" onClick={() => onSelectCategory(cat.name)}>
                        <div className="icon-wrapper">
                            {cat.icon}
                        </div>
                        <h3>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalTypesGrid;