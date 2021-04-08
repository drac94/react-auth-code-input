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
        var _e$target$nextElement;
        (_e$target$nextElement = e.target.nextElementSibling) === null || _e$target$nextElement === void 0 ? void 0 : _e$target$nextElement.focus();
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
    const target = e.target;

    if (key === 'Backspace') {
      if (target.value === '' && target.previousElementSibling !== null) {
        if (target.previousElementSibling !== null) {
          var _target$previousEleme;
          (_target$previousEleme = target.previousElementSibling) === null || _target$previousEleme === void 0 ? void 0 : _target$previousEleme.focus();
          e.preventDefault();
        }
      } else {
        target.value = '';
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
          var _inputsRef$current$i$;
          (_inputsRef$current$i$ = inputsRef.current[i].nextElementSibling) === null || _inputsRef$current$i$ === void 0 ? void 0 : _inputsRef$current$i$.focus();
        }
      }

      sendResult();
    }

    e.preventDefault();
  };

  const inputs = [];

  for (let i = 0; i < _characters; i++) {
    inputs.push(React.createElement("input", {
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

  return React.createElement("div", {
    style: containerStyle
  }, inputs);
};

export default AuthCode;
//# sourceMappingURL=index.modern.js.map
