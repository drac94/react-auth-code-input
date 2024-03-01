import React, { useRef, useState } from 'react';

import AuthCode, { AuthCodeProps, AuthCodeRef } from 'react-auth-code-input';
import './index.css';

const allowedCharactersMap = [
  { id: 'alphanumeric', name: 'Letters & Numbers' },
  { id: 'alpha', name: 'Only Letters' },
  { id: 'numeric', name: 'Only Numbers' }
];

const App = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [allowedCharacters, setAllowedCharacters] = useState<
    AuthCodeProps['allowedCharacters']
  >('alphanumeric');
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  const handleAllowedCharactersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id } = e.currentTarget;
    // @ts-ignore
    setAllowedCharacters(id);
    setResult('');
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
          <h2>
            Two-Factor
            <br /> Authentication
          </h2>
          <AuthCode
            key={allowedCharacters}
            allowedCharacters={allowedCharacters}
            ref={AuthInputRef}
            onChange={handleOnChange}
            containerClassName='container'
            inputClassName='input'
            isPassword={isPassword}
            disabled={disabled}
          />
          <p>
            A message with a verification code has been sent to <br />
            your devices. Enter the code to continue.
          </p>
          <p>Code: {result}</p>
          <div className='props'>
            <div className='options'>
              <div className='props-input-container'>
                <input
                  type='checkbox'
                  id='isPassword'
                  name='isPassword'
                  onChange={(e) => setIsPassword(e.target.checked)}
                />
                <label htmlFor='isPassword'>Password</label>
              </div>

              <div className='props-input-container'>
                <input
                  type='checkbox'
                  id='disabled'
                  name='disabled'
                  onChange={(e) => setDisabled(e.target.checked)}
                />
                <label htmlFor='disabled'>Disabled</label>
              </div>

              <button onClick={() => AuthInputRef.current?.focus()}>
                Focus
              </button>

              <button onClick={() => AuthInputRef.current?.clear()}>
                Clear
              </button>
            </div>

            <div className='allowed-characters'>
              {allowedCharactersMap.map((aC) => (
                <div className='props-input-container' key={aC.id}>
                  <input
                    type='radio'
                    id={aC.id}
                    name='allowedRadio'
                    onChange={handleAllowedCharactersChange}
                    checked={allowedCharacters === aC.id}
                  />
                  <label htmlFor={aC.id}>{aC.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
