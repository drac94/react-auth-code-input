import React, { useRef, useEffect } from 'react';

const propsMap = {
  alpha: {
    type: 'text',
    inputMode: 'text',
    pattern: '[a-zA-Z]{1}'
  },
  alphanumeric: {
    type: 'text',
    inputMode: 'text',
    pattern: '[a-zA-Z0-9]{1}'
  },
  numeric: {
    type: 'number',
    inputMode: 'numeric',
    pattern: '[0-9]{1}',
    min: '0',
    max: '9'
  }
};

const AuthCode = ({
  allowedCharacters: _allowedCharacters = 'alphanumeric',
  ariaLabel,
  length: _length = 6,
  containerClassName,
  inputClassName,
  isPassword: _isPassword = false,
  onChange
}) => {
  const inputsRef = useRef([]);
  const inputProps = propsMap[_allowedCharacters];
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const sendResult = () => {
    const res = inputsRef.current.map(input => input.value).join('');
    onChange && onChange(res);
  };

  const handleOnChange = e => {
    const {
      target: {
        value,
        nextElementSibling
      }
    } = e;

    if (value.length > 1) {
      e.target.value = value.charAt(0);

      if (nextElementSibling !== null) {
        nextElementSibling.focus();
      }
    } else {
      if (value.match(inputProps.pattern)) {
        if (nextElementSibling !== null) {
          nextElementSibling.focus();
        }
      } else {
        e.target.value = '';
      }
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
          target.previousElementSibling.focus();
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
    const pastedValue = e.clipboardData.getData('Text');
    let currentInput = 0;

    for (let i = 0; i < pastedValue.length; i++) {
      const pastedCharacter = pastedValue.charAt(i);
      const currentValue = inputsRef.current[currentInput].value;

      if (pastedCharacter.match(inputProps.pattern)) {
        if (!currentValue) {
          inputsRef.current[currentInput].value = pastedCharacter;

          if (inputsRef.current[currentInput].nextElementSibling !== null) {
            inputsRef.current[currentInput].nextElementSibling.focus();
            currentInput++;
          }
        }
      }
    }

    sendResult();
    e.preventDefault();
  };

  const inputs = [];

  for (let i = 0; i < _length; i++) {
    inputs.push(React.createElement("input", Object.assign({
      key: i,
      onChange: handleOnChange,
      onKeyDown: handleOnKeyDown,
      onFocus: handleOnFocus,
      onPaste: handleOnPaste
    }, inputProps, {
      type: _isPassword ? 'password' : inputProps.type,
      ref: el => inputsRef.current[i] = el,
      maxLength: 1,
      className: inputClassName,
      autoComplete: i === 0 ? 'one-time-code' : 'off',
      "aria-label": ariaLabel ? `${ariaLabel}. Character ${i + 1}.` : `Character ${i + 1}.`
    })));
  }

  return React.createElement("div", {
    className: containerClassName
  }, inputs);
};

export default AuthCode;
//# sourceMappingURL=index.modern.js.map
