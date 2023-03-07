import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import SignInForm from './SignInForm';
import LoginForm from './LoginForm';

import Nav from './component/nav';

function App() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
        // console.log(data)
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };

  const handleAuthClick = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/user_is_authed', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  console.log(user);

  const renderForm = () => {
    switch (form) {
      case 'login':
        return <LoginForm handleLogin={handleLogin} />;
        break;
      default:
        return <SignInForm handleLogin={handleLogin} />;
    }
  };

  return (
    <div>
      <div>
        <h1> Head component</h1>
        <Router>
          <Nav />
        </Router>
      </div>

      <div className="App">
        <Header handleFormSwitch={handleFormSwitch} />
        {
          renderForm()
        }
        <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button>
      </div>
    </div>

  );
}

export default App;
