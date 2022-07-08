import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

var allowedCharactersValues = ['alpha', 'numeric', 'alphanumeric'];
var propsMap = {
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
    type: 'tel',
    inputMode: 'numeric',
    pattern: '[0-9]{1}',
    min: '0',
    max: '9'
  }
};
var AuthCode = forwardRef(function (_ref, ref) {
  var _ref$allowedCharacter = _ref.allowedCharacters,
      allowedCharacters = _ref$allowedCharacter === void 0 ? 'alphanumeric' : _ref$allowedCharacter,
      ariaLabel = _ref.ariaLabel,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
      containerClassName = _ref.containerClassName,
      disabled = _ref.disabled,
      inputClassName = _ref.inputClassName,
      _ref$isPassword = _ref.isPassword,
      isPassword = _ref$isPassword === void 0 ? false : _ref$isPassword,
      _ref$length = _ref.length,
      length = _ref$length === void 0 ? 6 : _ref$length,
      placeholder = _ref.placeholder,
      onChange = _ref.onChange;

  if (isNaN(length) || length < 1) {
    throw new Error('Length should be a number and greater than 0');
  }

  if (!allowedCharactersValues.some(function (value) {
    return value === allowedCharacters;
  })) {
    throw new Error('Invalid value for allowedCharacters. Use alpha, numeric, or alphanumeric');
  }

  var inputsRef = useRef([]);
  var inputProps = propsMap[allowedCharacters];
  useImperativeHandle(ref, function () {
    return {
      focus: function focus() {
        if (inputsRef.current) {
          inputsRef.current[0].focus();
        }
      },
      clear: function clear() {
        if (inputsRef.current) {
          for (var i = 0; i < inputsRef.current.length; i++) {
            inputsRef.current[i].value = '';
          }

          inputsRef.current[0].focus();
        }

        sendResult();
      }
    };
  });
  useEffect(function () {
    if (autoFocus) {
      inputsRef.current[0].focus();
    }
  }, []);

  var sendResult = function sendResult() {
    var res = inputsRef.current.map(function (input) {
      return input.value;
    }).join('');
    onChange && onChange(res);
  };

  var handleOnChange = function handleOnChange(e) {
    var _e$target = e.target,
        value = _e$target.value,
        nextElementSibling = _e$target.nextElementSibling;

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

  var handleOnKeyDown = function handleOnKeyDown(e) {
    var key = e.key;
    var target = e.target;

    if (key === 'Backspace') {
      if (target.value === '') {
        if (target.previousElementSibling !== null) {
          var t = target.previousElementSibling;
          t.value = '';
          t.focus();
          e.preventDefault();
        }
      } else {
        target.value = '';
      }

      sendResult();
    }
  };

  var handleOnFocus = function handleOnFocus(e) {
    e.target.select();
  };

  var handleOnPaste = function handleOnPaste(e) {
    var pastedValue = e.clipboardData.getData('Text');
    var currentInput = 0;

    for (var i = 0; i < pastedValue.length; i++) {
      var pastedCharacter = pastedValue.charAt(i);
      var currentValue = inputsRef.current[currentInput].value;

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

  var inputs = [];

  var _loop = function _loop(i) {
    inputs.push(React.createElement("input", Object.assign({
      key: i,
      onChange: handleOnChange,
      onKeyDown: handleOnKeyDown,
      onFocus: handleOnFocus,
      onPaste: handleOnPaste
    }, inputProps, {
      type: isPassword ? 'password' : inputProps.type,
      ref: function ref(el) {
        inputsRef.current[i] = el;
      },
      maxLength: 1,
      className: inputClassName,
      autoComplete: i === 0 ? 'one-time-code' : 'off',
      "aria-label": ariaLabel ? ariaLabel + ". Character " + (i + 1) + "." : "Character " + (i + 1) + ".",
      disabled: disabled,
      placeholder: placeholder
    })));
  };

  for (var i = 0; i < length; i++) {
    _loop(i);
  }

  return React.createElement("div", {
    className: containerClassName
  }, inputs);
});

export default AuthCode;
//# sourceMappingURL=index.modern.js.map
