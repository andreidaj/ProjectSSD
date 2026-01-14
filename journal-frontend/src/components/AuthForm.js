import React, { useState } from 'react';
import JournalService from '../services/JournalService';
import { FaFeatherAlt } from 'react-icons/fa';

const AuthForm = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let response;
            if (isLogin) {
                response = await JournalService.login({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                response = await JournalService.register({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username
                });
            }
            onLogin(response.data);
        } catch (err) {
            setError('Authentication failed.');
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({ email: '', password: '', username: '' });
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper" key={isLogin ? 'login' : 'register'}>

                {/* --- HEADER --- */}
                <div className="text-center mb-4">
                    <div style={{
                        display: 'inline-flex',
                        padding: '18px',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        borderRadius: '50%',
                        marginBottom: '15px',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                    }}>
                        <FaFeatherAlt style={{ fontSize: '2.5rem', color: 'white' }} />
                    </div>

                    <h2 className="text-white fw-bold mb-1">My Journal</h2>

                    {/* AICI ESTE MODIFICAREA: color: 'white' (Alb pur) */}
                    <p style={{color: 'white', fontSize: '0.95rem', opacity: 1}}>
                        {isLogin ? 'Welcome back! Please login.' : 'Create your personal account.'}
                    </p>
                </div>

                {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-3">
                            <input
                                type="text" name="username" className="form-control dark-auth-input"
                                placeholder="Username" value={formData.username}
                                onChange={handleChange} required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="mb-3">
                        <input
                            type="email" name="email" className="form-control dark-auth-input"
                            placeholder="Email Address" value={formData.email}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password" name="password" className="form-control dark-auth-input"
                            placeholder="Password" value={formData.password}
                            onChange={handleChange} required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 auth-btn mb-3 fw-bold" style={{padding: '12px'}}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                {/* --- FOOTER --- */}
                <div className="text-center mt-3 text-white">
                    <small style={{fontSize: '0.9rem'}}>
                        {isLogin ? "New here? " : "Already joined? "}
                        <span onClick={toggleMode} style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
                            {isLogin ? 'Create Account' : 'Login'}
                        </span>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;