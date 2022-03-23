import React, { useRef, useState } from 'react';

import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import './index.css';

const App = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return (
    <div className='main'>
      <h1>React Auth Code Input</h1>
      <p>One-time password (OTP) React component.</p>
      <div className='badges'>
        <img
          alt=''
          src='https://img.shields.io/npm/v/react-auth-code-input.svg'
        />
        <img
          alt='code style standard'
          src='https://img.shields.io/badge/code_style-standard-brightgreen.svg'
        />
        <img
          alt='license MIT'
          src='https://img.shields.io/badge/license-MIT-brightgreen.svg'
        />
        <img
          alt=''
          src='https://img.shields.io/npm/dt/react-auth-code-input.svg'
        />
        <img
          alt=''
          src='https://img.shields.io/npm/dw/react-auth-code-input.svg'
        />
      </div>
      <p>
        <a href='https://github.com/drac94/react-auth-code-input'>
          View documentation on GitHub
        </a>
      </p>
      <div>
        <div>
          <h1>
            Two-Factor
            <br /> Authentication
          </h1>
          <AuthCode
            ref={AuthInputRef}
            onChange={handleOnChange}
            containerClassName='container'
            inputClassName='input'
            isPassword={isPassword}
          />
          <p>
            A message with a verification code has been sent to <br />
            your devices. Enter the code to continue.
          </p>
          <p>Code: {result}</p>
          <div className='controls'>
            <div>
              <input
                type='checkbox'
                id='isPassword'
                name='isPassword'
                onChange={(e) => setIsPassword(e.target.checked)}
              />
              <label htmlFor='isPassword'>Password</label>
            </div>
            <button onClick={() => AuthInputRef.current?.focus()}>Focus</button>
            <button onClick={() => AuthInputRef.current?.clear()}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
