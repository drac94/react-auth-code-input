![image](https://user-images.githubusercontent.com/1719915/82956329-2f7e8700-9f76-11ea-978f-ec7135c79311.png)

# React Auth Code Input

> A React Component for inputting Auth Codes inspired in Apple Two-Factor Authentication UI. You can type, paste and move backwards using the backspace.

[![NPM](https://img.shields.io/npm/v/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input)
[![npm](https://img.shields.io/npm/dw/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input)
![GitHub actions state](https://img.shields.io/github/workflow/status/drac94/react-auth-code-input/CI)

## Demo

[Demo](https://www.luisguerrero.me/react-auth-code-input/)

## Install

```bash
npm install --save react-auth-code-input
```

or

```bash
yarn add react-auth-code-input
```

## Usage

```jsx
import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';

const App = () => {
  const [result, setResult] = useState('');
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return (
    <AuthCode
      characters={5}
      onChange={handleOnChange}
      containerClassName='container'
      inputClassName='input'
    />
  );
};
```

### Props

| Prop                 | Type                    | Description                                                                     | Default Value  | Observations                   |
| :------------------- | :---------------------- | :------------------------------------------------------------------------------ | :------------- | :----------------------------- |
| `allowedCharacters`  | String                  | Regex for allowed characters                                                    | `^[A-Za-z0-9]` |                                |
| `characters`         | Number                  | The number of inputs to display                                                 | 6              |                                |
| `containerClassName` | String                  | The styles to be applied to the container                                       |                |                                |
| `inputClassName`     | String                  | The styles to be applied to each input                                          |                |                                |
| `inputType`          | String                  | The type of the inputs                                                          | text           | text, number or password       |
| `onChange`           | Function(value: String) | Callback function called every time an input value changes                      |                |                                |
| ~~`password`~~       | Boolean                 | If present changes the type of the input to password, by default is set to text | false          | deprecated since version 2.0.0 |
| ~~`inputStyle`~~     | Object                  | The styles to be applied to each input                                          |                | deprecated since version 1.2.0 |
| ~~`containerStyle`~~ | Object                  | The styles to be applied to the container                                       |                | deprecated since version 1.2.0 |

## Changelog

### 2.0.0

- Remove `inputStyle` prop in favor of `inputClassName`.
- Remove `containerStyle` prop in favor of `containerClassName`.
- Remove `password` prop in favor of `inputType` which accepts _text_, _password_ or _number_ value.

### 1.2.1

- Add missing dist files.

### 1.2.0

- Add `inputClassName` and `containerClassName` props.
- Deprecate `inputStyle` and `containerStyle`.
- Make `onChange` prop mandatory.

### 1.1.0

- Typescript support.

### 1.0.0

- Initial Version.

## License

Licensed under the MIT License, Copyright © 2020-present Luis Guerrero [drac94](https://github.com/drac94).

See [LICENSE](./LICENSE) for more information.
