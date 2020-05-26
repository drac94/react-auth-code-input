import React from 'react'

import AuthCode from 'react-auth-code-input'

const App = () => {
  return (
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
        border: '1px solid black',
        textTransform: 'uppercase'
      }}
    />
  )
}

export default App
