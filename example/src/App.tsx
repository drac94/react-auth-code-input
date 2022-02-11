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
      <h2>Default</h2>
      <p>
        Try it out by writing some characters.
        <br />
        <br />
        Delete and move back using the backspace.
        <br />
        <br />
        You can also paste text as long as it matches the allowed characters
        defined in the Regular Expression (By default accepts alphanumeric
        characters).
      </p>
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
        allowedCharacters='[0-9]+'
        onChange={() => null}
        characters={5}
        containerClassName='container'
        inputClassName='input'
        inputType='number'
      />
      <p>index.tsx</p>
      <code>
        {`
import React from 'react'
import AuthCode from 'react-auth-code-input'

const App = () => {
  return (<AuthCode
    allowedCharacters='[0-9]+'
    characters={5}
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
      <h2>Input Types</h2>
      <p>
        Choose between <b>numeric</b>, <b>text</b> or <b>password</b> input
        types (Defaults to text).
      </p>
      <AuthCode
        onChange={() => null}
        characters={5}
        inputType='password'
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
    characters={5}
    inputType='password'
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
