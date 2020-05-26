import React, { useRef, useEffect } from 'react';

const AuthCode = ({
  characters: _characters = 6,
  allowedCharacters: _allowedCharacters = '^[A-Za-z0-9]*$',
  onChange,
  password,
  inputStyle,
  containerStyle
}) => {
  const inputsRef = useRef([]);
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const sendResult = () => {
    const res = inputsRef.current.map(input => input.value).join('');
    onChange && onChange(res);
  };

  const handleOnChange = e => {
    if (e.target.value.match(_allowedCharacters)) {
      if (e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.focus();
      }
    } else {
      e.target.value = '';
    }

    sendResult();
  };

  const handleOnKeyDown = e => {
    const {
      key
    } = e;

    if (key === 'Backspace') {
      if (e.target.value === '' && e.target.previousElementSibling !== null) {
        if (e.target.previousElementSibling !== null) {
          e.target.previousElementSibling.focus();
          e.preventDefault();
        }
      } else {
        e.target.value = '';
      }

      sendResult();
    }
  };

  const handleOnFocus = e => {
    e.target.select();
  };

  const handleOnPaste = e => {
    const value = e.clipboardData.getData('Text');

    if (value.match(_allowedCharacters)) {
      for (let i = 0; i < _characters && i < value.length; i++) {
        inputsRef.current[i].value = value.charAt(i);

        if (inputsRef.current[i].nextElementSibling !== null) {
          inputsRef.current[i].nextElementSibling.focus();
        }
      }

      sendResult();
    }

    e.preventDefault();
  };

  const inputs = [];

  for (let i = 0; i < _characters; i++) {
    inputs.push( /*#__PURE__*/React.createElement("input", {
      key: i,
      onChange: handleOnChange,
      onKeyDown: handleOnKeyDown,
      onFocus: handleOnFocus,
      onPaste: handleOnPaste,
      type: password ? 'password' : 'text',
      ref: el => inputsRef.current[i] = el,
      maxLength: 1,
      style: inputStyle
    }));
  }

  return /*#__PURE__*/React.createElement("div", {
    style: containerStyle
  }, inputs);
};

export default AuthCode;
//# sourceMappingURL=index.modern.js.map
