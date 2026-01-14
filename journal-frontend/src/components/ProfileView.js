import React, { useState } from 'react';
import JournalService from '../services/JournalService';

const ProfileView = ({ user, onUpdateUser }) => {

    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

    const handleUpdateInfo = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            displayName: displayName,
            photoURL: photoURL
        };

        JournalService.updateProfile(updatedUser)
            .then(res => {
                onUpdateUser(res.data);
                setStatusMsg({ text: 'Profile updated successfully!', type: 'success' });
            })
            .catch(err => setStatusMsg({ text: 'Error updating profile.', type: 'danger' }));
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

        const userId = user?.id || user?.uid;

        console.log("DEBUG: Attempting password change for ID:", userId);

        if (!userId) {
            setStatusMsg({ text: 'Error: User ID missing! Please log in again.', type: 'danger' });
            return;
        }

        if (!oldPassword || !newPassword) {
            setStatusMsg({ text: 'Please complete both fields!', type: 'danger' });
            return;
        }

        if (newPassword.length < 6) {
            setStatusMsg({ text: 'New password must be at least 6 characters!', type: 'danger' });
            return;
        }

        JournalService.updatePassword(userId, oldPassword, newPassword)
            .then(() => {
                setStatusMsg({ text: 'Password updated successfully!', type: 'success' });
                setOldPassword('');
                setNewPassword('');
            })
            .catch(err => {
                console.error("Server error:", err.response?.data);
                setStatusMsg({ text: 'Old password is incorrect!', type: 'danger' });
            });
    };

    return (
        <div className="card p-4 bg-dark text-white shadow" style={{ maxWidth: '450px', borderRadius: '15px' }}>
            <h2 className="mb-4 text-center">Profile Settings</h2>

            {statusMsg.text && (
                <div className={`alert alert-${statusMsg.type} p-2 small text-center`}>
                    {statusMsg.text}
                </div>
            )}

            <form onSubmit={handleUpdateInfo} className="mb-4 border-bottom border-secondary pb-4">
                <div className="mb-3">
                    <label className="form-label small text-secondary">Display Name</label>
                    <input
                        className="form-control"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label small text-secondary">Avatar URL</label>
                    <input
                        className="form-control"
                        value={photoURL}
                        onChange={e => setPhotoURL(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save Changes</button>
            </form>

            <form onSubmit={handlePasswordChange}>
                <h5 className="text-warning mb-3">Account Security</h5>
                <div className="mb-3">
                    <label className="form-label small text-secondary">Old Password</label>
                    <div className="input-group">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            className="form-control"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                        >
                            {showOldPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label small text-secondary">New Password</label>
                    <div className="input-group">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Min. 6 characters"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-warning w-100">Update Password</button>
            </form>
        </div>
    );
};

export default ProfileView;