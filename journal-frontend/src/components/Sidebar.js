import React from 'react';
import { FaHome, FaBook, FaUser } from 'react-icons/fa';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user }) => {
    // MODIFICARE: Firebase folosește displayName și photoURL
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'Guest';
    const avatarUrl = user?.photoURL;

    return (
        <div className="sidebar">
            <div className="d-flex align-items-center mb-5 mt-2">
                <div style={{
                    width: '50px',
                    height: '50px',
                    background: avatarUrl ? 'transparent' : 'rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '50%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    fontSize:'20px',
                    fontWeight: 'bold',
                    marginRight:'12px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    overflow: 'hidden',
                    flexShrink: 0
                }}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            onError={(e) => {e.target.style.display='none'}}
                        />
                    ) : (
                        <span>{displayName.charAt(0).toUpperCase()}</span>
                    )}
                </div>

                <div style={{color: 'white', overflow: 'hidden'}}>
                    <small style={{opacity: 0.7, fontSize: '0.8rem'}}>Welcome,</small><br/>
                    <span style={{
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                    }}>
                        {displayName}
                    </span>
                </div>
            </div>

            <ul className="sidebar-menu">
                <li className={`sidebar-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
                    <FaHome /> <span>Home Page</span>
                </li>
                <li className={`sidebar-item ${activeTab === 'types' ? 'active' : ''}`} onClick={() => setActiveTab('types')}>
                    <FaBook /> <span>Journal Types</span>
                </li>
                <li className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                    <FaUser /> <span>Profile</span>
                </li>
            </ul>

            <div style={{marginTop: 'auto'}}>
                <button
                    className="btn w-100"
                    style={{border: '1px solid rgba(255,255,255,0.3)', color: 'white'}}
                    onClick={onLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;