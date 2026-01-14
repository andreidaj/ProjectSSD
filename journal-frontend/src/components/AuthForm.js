import React, { useState } from 'react';

const AuthForm = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = { email, password };
            let response;

            // We use fetch directly here or import JournalService if you prefer
            const url = isLogin
                ? 'http://localhost:8081/api/auth/login'
                : 'http://localhost:8081/api/auth/register';

            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            const data = await res.json(); // Returns the user object or null/error

            if (data && data.id) {
                onLogin(data); // Success!
            } else {
                setError('Invalid credentials or email already exists.');
            }
        } catch (err) {
            setError('Something went wrong. Is the backend running?');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-3">{isLogin ? 'Login' : 'Register'}</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-3 text-center">
                    <button
                        className="btn btn-link"
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                    >
                        {isLogin ? "Need an account? Register" : "Have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;