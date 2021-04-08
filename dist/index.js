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
      containerStyle = _ref.containerStyle;
  var inputsRef = React.useRef([]);
  React.useEffect(function () {
    inputsRef.current[0].focus();
  }, []);

  var sendResult = function sendResult() {
    var res = inputsRef.current.map(function (input) {
      return input.value;
    }).join('');
    onChange && onChange(res);
  };

  var handleOnChange = function handleOnChange(e) {
    if (e.target.value.match(allowedCharacters)) {
      if (e.target.nextElementSibling !== null) {
        var _e$target$nextElement;
        (_e$target$nextElement = e.target.nextElementSibling) === null || _e$target$nextElement === void 0 ? void 0 : _e$target$nextElement.focus();
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

  var handleOnFocus = function handleOnFocus(e) {
    e.target.select();
  };

  var handleOnPaste = function handleOnPaste(e) {
    var value = e.clipboardData.getData('Text');

    if (value.match(allowedCharacters)) {
      for (var i = 0; i < characters && i < value.length; i++) {
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
      style: inputStyle
    }));
  };

  for (var i = 0; i < characters; i++) {
    _loop(i);
  }

  return React__default.createElement("div", {
    style: containerStyle
  }, inputs);
};

module.exports = AuthCode;
//# sourceMappingURL=index.js.map
