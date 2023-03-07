import React, { useState } from 'react';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    const { handleLogin } = props || { handleLogin: () => {} };
    evt.preventDefault();
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
        handleLogin(data.user);
      });
    setUsername('');
    setPassword('');
  };
  const formDivStyle = {
    margin: 'auto',
    padding: '20px',
    width: '80%',
  };
  return (
    <div>
      <div style={formDivStyle}>
        <h1>Log In</h1>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username: </label>
            <input id="username" value={username} onChange={handleUsernameChange} type="text" placeholder="username" />
          </div>
          <div className="field">
            <label htmlFor="password">Password: </label>
            <input id="password" value={password} onChange={handlePasswordChange} type="password" placeholder="password" />
          </div>

          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
