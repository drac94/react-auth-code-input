import React, { useState } from 'react';

import AuthCode from 'react-auth-code-input';
import './index.css';

const App = () => {
  const [result, setResult] = useState<string>('');
  const handleOnChange = (res: string) => {
    setResult(res);
  };
  return (
    <div className='main'>
      <h1>React Auth Code Input</h1>
      <p>One-time password (OTP) React input component.</p>
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
      <h3>Modes:</h3>
      <ul>
        <li>Alpha.</li>
        <li>Alphanumeric (default).</li>
        <li>Numeric.</li>
      </ul>
      <h3>Supports:</h3>
      <ul>
        <li>Pasting.</li>
        <li>Move back using the backspace key.</li>
        <li>SMS.</li>
      </ul>
      <h2>Default</h2>
      <AuthCode onChange={handleOnChange} />
      {result && <p>Result: {result}</p>}
      <code>
        {`
import React, { useState } from 'react'
import AuthCode from 'react-auth-code-input'

const App = () => {
  const [result, setResult] = useState<string>('');
  const handleOnChange = (res: string) => {
    setResult(res);
  };
  return (
    <div>
      <AuthCode onChange={handleOnChange} />
      {result && <p>Result: {result}</p>}
    </div>
  );
        `}
      </code>
      <h2>Custom Styles</h2>
      <p>
        Customize the look by passing CSS classes to the{' '}
        <i>containerClassName</i> and <i>inputClassName</i> properties.
      </p>
      <AuthCode
        allowedCharacters='numeric'
        onChange={() => null}
        length={5}
        containerClassName='container'
        inputClassName='input'
      />
      <p>index.tsx</p>
      <code>
        {`
import React from 'react'
import AuthCode from 'react-auth-code-input'

const App = () => {
  return (<AuthCode
    allowedCharacters='numeric'
    length={5}
    containerClassName='container'
    inputClassName='input'
    inputType='number'
    onChange={handleOnChange}
  />)
}
        `}
      </code>
      <p>styles.css</p>
      <code>
        {`
.container {
  padding: 16px;
}

.input {
  width: 2ch;
  padding: 8px;
  border-radius: 8px;
  font-size: 40px;
  text-align: center;
  margin-right: 12px;
  border: 1px solid white;
  text-transform: uppercase;
}
        `}
      </code>
      <h2>Passwords</h2>
      <p>Protect your inputs.</p>
      <AuthCode
        onChange={() => null}
        length={5}
        isPassword
        containerClassName='container'
        inputClassName='input'
      />
      <p>index.tsx</p>
      <code>
        {`
import React from 'react'
import AuthCode from 'react-auth-code-input'

const App = () => {
  return (<AuthCode
    length={5}
    isPassword
    containerClassName='container'
    inputClassName='input'
    onChange={handleOnChange}
  />)
}
        `}
      </code>
      <a
        className='github-fork-ribbon'
        href='https://github.com/drac94/react-auth-code-input'
        data-ribbon='Fork me on GitHub'
        title='Fork me on GitHub'
        target='_blank'
        rel='noopener noreferrer'
      >
        Fork me on GitHub
      </a>
    </div>
  );
};

export default App;
