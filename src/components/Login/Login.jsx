import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [logType, setLogType] = useState('signIn');

  const toSignUp = () => {
    setLogType('signUp');
  };

  const toSignIn = () => {
    setLogType('signIn');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="main">
      <div className="login">
        {logType === 'signIn' ? (
          <>
            <h2>SIGN IN</h2>
            <p className="option-login">Forgot Password?</p>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit" onClick={handleSubmit}>
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
            <input type="text" placeholder="Enter an username" />
            <input type="password" placeholder="Enter a password" />
            <input type="password" placeholder="Confirm your password" />
            <button type="submit" onClick={handleSubmit}>
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
