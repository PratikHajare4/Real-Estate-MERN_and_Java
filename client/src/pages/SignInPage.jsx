// SignInPage.jsx

import React, { useState } from 'react';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (username === 'admin' && password === '12345') {
      // Redirect to /dash upon successful login
      window.location.href = '/dash';
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='mt-50'>
      <h1>Sign In</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignInPage;
