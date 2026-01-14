import React, { useState } from 'react';
import JournalService from '../services/JournalService';

const ProfileView = ({ user, onUpdateUser }) => {
    const [formData, setFormData] = useState({ email: user.email, username: user.username||'', profilePicture: user.profilePicture||'' });

    const handleSave = async (e) => {
        e.preventDefault();
        const res = await JournalService.updateProfile(formData);
        if (res.data) { onUpdateUser(res.data); alert('Profil actualizat!'); }
    };

    return (
        <div className="card p-4 bg-dark text-white" style={{maxWidth:'500px'}}>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSave}>
                <label className="mt-2">Display Name</label>
                <input className="form-control" value={formData.username} onChange={e=>setFormData({...formData, username:e.target.value})} />

                <label className="mt-2">Avatar URL (Image Link)</label>
                <input className="form-control" value={formData.profilePicture} onChange={e=>setFormData({...formData, profilePicture:e.target.value})} />

                <button className="btn btn-primary w-100 mt-4">Save</button>
            </form>
        </div>
    );
};
export default ProfileView;