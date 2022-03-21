import React, { useRef, useState } from 'react';

import AuthCode, { AuthCodeRef } from 'react-auth-code-input';
import './index.css';

const App = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState<string>('');
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
          <AuthCode
            ref={AuthInputRef}
            onChange={handleOnChange}
            containerClassName='container'
            inputClassName='input'
          />

          <p>Result: {result}</p>
          <button onClick={() => AuthInputRef.current?.focus()}>Focus</button>
          <button onClick={() => AuthInputRef.current?.clear()}>Clear</button>
        </div>
        <code>
          {`
import React, { useRef, useState } from 'react';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';

const App = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState<string>('');
  const handleOnChange = (res: string) => {
    setResult(res);
  };
  return (
    <div>
      <AuthCode
        ref={AuthInputRef}
        onChange={handleOnChange}
        containerClassName='container'
        inputClassName='input'
      />

      <p>Result: {result}</p>
      <button onClick={() => AuthInputRef.current?.focus()}>Focus</button>
      <button onClick={() => AuthInputRef.current?.clear()}>Clear</button>
    </div>
  );
}
        `}
        </code>
      </div>
    </div>
  );
};

export default App;
