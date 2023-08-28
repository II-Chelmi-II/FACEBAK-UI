import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({userSession, setUserSession}) {

  const navigate = useNavigate();
  const [logType, setLogType] = useState('signIn');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailRequired, setEmailRequired] = useState(false);
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [signupEmailRequired, setSignupEmailRequired] = useState(false);
  const [signupUsernameRequired, setSignupUsernameRequired] = useState(false);
  const [signupPasswordRequired, setSignupPasswordRequired] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const toSignUp = () => {
    setLogType('signUp');
  };

  const toSignIn = () => {
    setLogType('signIn');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userLog = {
      username,
      email,
      password,
      joinedAt: new Date(),
      bio: "",
      photo: ""
    }
    const userLocal = JSON.parse(localStorage.getItem('userLocal'));
    if (username !== '' && password !== '') {
      if (userLocal.username === userLog.username && userLocal.email === userLog.email && userLocal.password === userLog.password) {
        navigate('/Interface/Interface');
        setUserSession(userLog);
      }
    } else {
      setEmailRequired(email === '');
      setUsernameRequired(username === '');
      setPasswordRequired(password === '');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      confirmPassword,
      password,
      username,
      joinedAt: new Date(),
      bio: "",
      photo: ""
    };

    if (email !== '' && username !== '' && password !== '' && confirmPassword !== '' && passwordsMatch) {
      // Envoie la requête POST pour insérer l'utilisateur
      axios.post('http://[::1]:8080/users', user)
        .then(response => {
          console.log('User inserted', response.data);
          localStorage.setItem('userLocal', JSON.stringify(user));
          setUserSession(user)
          navigate('/Interface/Interface');
        })
        .catch(error => {
          console.error('User not inserted', error);
        });
    } else {
      setSignupEmailRequired(email === '');
      setSignupUsernameRequired(username === '');
      setSignupPasswordRequired(password === '');
      setConfirmPasswordRequired(confirmPassword === '');
    }
  };

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);
  return (
    <div className="main">
      <div className="login">
        {logType === 'signIn' ? (
          <>
            <h2>SIGN IN</h2>
            <p className="option-login">Forgot Password?</p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={usernameRequired ? 'required' : ''}
            />
            {usernameRequired && <span className="required-text">Required</span>}

            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={emailRequired ? 'required' : ''}
            />
            {emailRequired && <span className="required-text">Required</span>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordRequired ? 'required' : ''}
            />
            {passwordRequired && <span className="required-text">Required</span>}
            <button type="submit" onClick={handleSubmit} disabled={username === '' || password === ''}>
              Login
            </button>
            <div>
              <div>Don't have an account ?</div>
              <span className="option-login" onClick={toSignUp}>
                Sign up
              </span>
            </div>
          </>
        ) : (
          <>
            <h2>SIGN UP</h2>
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={signupEmailRequired ? 'required' : ''}
            />
            {signupEmailRequired && <span className="required-text">Required</span>}

            <input
              type="text"
              placeholder="Enter an username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={signupUsernameRequired ? 'required' : ''}
            />
            {signupUsernameRequired && <span className="required-text">Required</span>}
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={signupPasswordRequired ? 'required' : ''}
            />
            {signupPasswordRequired && <span className="required-text">Required</span>}
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={confirmPasswordRequired || !passwordsMatch ? 'required' : ''}
            />
            {confirmPasswordRequired && <span className="required-text">Required</span>}
            {!passwordsMatch && <span className="required-text" style={{ color: '#E84545' }}>Passwords must match</span>}
            <button type="submit" onClick={handleSignupSubmit} disabled={username === '' || password === '' || confirmPassword === '' || !passwordsMatch}>
              Sign up
            </button>
            <div>
              <div>Already have an account ?</div>
              <span className="option-login" onClick={toSignIn}>
                Sign in
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;