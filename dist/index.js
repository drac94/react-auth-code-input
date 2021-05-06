function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var AuthCode = function AuthCode(_ref) {
  var _ref$characters = _ref.characters,
      characters = _ref$characters === void 0 ? 6 : _ref$characters,
      _ref$allowedCharacter = _ref.allowedCharacters,
      allowedCharacters = _ref$allowedCharacter === void 0 ? '^[A-Za-z0-9]*$' : _ref$allowedCharacter,
      onChange = _ref.onChange,
      password = _ref.password,
      inputStyle = _ref.inputStyle,
      containerStyle = _ref.containerStyle,
      inputClassName = _ref.inputClassName,
      containerClassName = _ref.containerClassName;
  var inputsRef = React.useRef([]);
  React.useEffect(function () {
    inputsRef.current[0].focus();
  }, []);

  var sendResult = function sendResult() {
    var res = inputsRef.current.map(function (input) {
      return input.value;
    }).join('');
    onChange(res);
  };

  var handleOnChange = function handleOnChange(e) {
    if (e.target.value.match(allowedCharacters)) {
      if (e.target.nextElementSibling !== null) {
        e.target.nextElementSibling.focus();
      }
    } else {
      e.target.value = '';
    }

    sendResult();
  };

  var handleOnKeyDown = function handleOnKeyDown(e) {
    var key = e.key;
    var target = e.target;

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

  var handleOnFocus = function handleOnFocus(e) {
    e.target.select();
  };

  var handleOnPaste = function handleOnPaste(e) {
    var value = e.clipboardData.getData('Text');

    if (value.match(allowedCharacters)) {
      for (var i = 0; i < characters && i < value.length; i++) {
        inputsRef.current[i].value = value.charAt(i);

        if (inputsRef.current[i].nextElementSibling !== null) {
          inputsRef.current[i].nextElementSibling.focus();
        }
      }

      sendResult();
    }

    e.preventDefault();
  };

  var inputs = [];

  var _loop = function _loop(i) {
    inputs.push(React__default.createElement("input", {
      key: i,
      onChange: handleOnChange,
      onKeyDown: handleOnKeyDown,
      onFocus: handleOnFocus,
      onPaste: handleOnPaste,
      type: password ? 'password' : 'text',
      ref: function ref(el) {
        return inputsRef.current[i] = el;
      },
      maxLength: 1,
      className: inputClassName,
      style: inputStyle
    }));
  };

  for (var i = 0; i < characters; i++) {
    _loop(i);
  }

  return React__default.createElement("div", {
    className: containerClassName,
    style: containerStyle
  }, inputs);
};

module.exports = AuthCode;
//# sourceMappingURL=index.js.map
