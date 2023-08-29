import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ userSession, setUserSession }) {
  const navigate = useNavigate();
  const [logType, setLogType] = useState('signIn');
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user')).username);
  const [password, setPassword] = useState(JSON.parse(localStorage.getItem('user')).password);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('user')).email);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errors, setErrors] = useState({
    emailRequired: false,
    usernameRequired: false,
    passwordRequired: false,
    confirmPasswordRequired: false,
    passwordsMatch: true
  });

  const toSignUp = () => {
    setLogType('signUp');
  };

  const toSignIn = () => {
    setLogType('signIn');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || username === '' || password === '') {
      setErrors((prevState) => ({ ...prevState, emailRequired: !email, usernameRequired: !username, passwordRequired: !password }));
      return;
    }

    try {
      const response = await axios.put('http://[::1]:8080/users', {
        username,
        email,
        password
      });
      console.log('User connected', response.data);
      alert(' Welcome !')

      const user = response.data;

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('username', username);
      localStorage.setItem('userBio', '');

      // Met à jour userSession dans le composant
      localStorage.setItem('user', JSON.stringify(user));
      setUserSession(user);
      console.log(JSON.parse(localStorage.getItem('user')));

      navigate('/Interface/Interface');
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (email === '' || username === '' || password === '' || confirmPassword === '' || !passwordsMatch) {
      setErrors({
        emailRequired: email === '',
        usernameRequired: username === '',
        passwordRequired: password === '',
        confirmPasswordRequired: confirmPassword === '',
        passwordsMatch: passwordsMatch
      });
      return;
    }

    const user = {
      email,
      confirmPassword,
      password,
      username,
      joinedAt: new Date(),
      bio: '',
      photo: ''
    };

    // Envoie la requête POST pour insérer l'utilisateur
    axios
      .post('http://[::1]:8080/users', user)
      .then((response) => {
        alert('Account created');
        console.log('User inserted', response.data);

        // Met à jour userSession dans le composant
        setUserSession(user);

            // Met à jour userSession dans le composant
      localStorage.setItem('user', JSON.stringify(user));
      console.log(JSON.parse(localStorage.getItem('user')));



        navigate('/Interface/Interface');
      })
      .catch((error) => {
        alert('Fail, please fill the filed right');
        console.error('User not inserted', error);
      });
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
              className={errors.usernameRequired ? 'required' : ''}
            />
            {errors.usernameRequired && <span className="required-text">Required</span>}

            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.emailRequired ? 'required' : ''}
            />
            {errors.emailRequired && <span className="required-text">Required</span>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.passwordRequired ? 'required' : ''}
            />
            {errors.passwordRequired && <span className="required-text">Required</span>}
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
              className={errors.signupEmailRequired ? 'required' : ''}
            />
            {errors.signupEmailRequired && <span className="required-text">Required</span>}

            <input
              type="text"
              placeholder="Enter an username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.signupUsernameRequired ? 'required' : ''}
            />
            {errors.signupUsernameRequired && <span className="required-text">Required</span>}
            <input
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.signupPasswordRequired ? 'required' : ''}
            />
            {errors.signupPasswordRequired && <span className="required-text">Required</span>}
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={(errors.confirmPasswordRequired || !passwordsMatch) ? 'required' : ''}
            />
            {errors.confirmPasswordRequired && <span className="required-text">Required</span>}
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