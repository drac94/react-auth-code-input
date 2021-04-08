import React from 'react'

import AuthCode from 'react-auth-code-input'
import './index.css'

const App = () => {
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
      <AuthCode />
      <code>
        {`
import React from 'react'
import AuthCode from 'react-auth-code-input'

const App = () => <AuthCode />
        `}
      </code>
      <h2>Custom Styles</h2>
      <p>
        Try writting and then deleting characters using backspace.
        <br />
        Pasting works too!, as long as the text copied matches the allowed
        characters.
      </p>
      <AuthCode
        characters={5}
        containerStyle={{
          padding: '16px'
        }}
        inputStyle={{
          width: '2ch',
          padding: '8px',
          borderRadius: '8px',
          fontSize: '40px',
          textAlign: 'center',
          marginRight: '12px',
          border: '1px solid white',
          textTransform: 'uppercase'
        }}
      />
      <code>
        {`
import React from 'react'
import AuthCode from 'react-auth-code-input'

const App = () => {
  return (<AuthCode
    characters={5}
    containerStyle={{
      padding: '16px'
    }}
    inputStyle={{
      width: '2ch',
      padding: '8px',
      borderRadius: '8px',
      fontSize: '40px',
      textAlign: 'center',
      marginRight: '12px',
      border: '1px solid white',
      textTransform: 'uppercase'
    }}
  />)
}
        `}
      </code>
    </div>
  )
}

export default App
