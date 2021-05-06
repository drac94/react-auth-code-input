![image](https://user-images.githubusercontent.com/1719915/82956329-2f7e8700-9f76-11ea-978f-ec7135c79311.png)

# React Auth Code Input

> A React Component for inputting Auth Codes inspired in Apple Two-Factor Authentication UI. It allows deleting using the backspace and pasting as well.

[![NPM](https://img.shields.io/npm/v/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input)
[![npm](https://img.shields.io/npm/dw/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input)

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
import React from 'react';
import AuthCode from 'react-auth-code-input';

const App = () => {
  return (
    <AuthCode
      characters={5}
      onChange={() => null}
      containerClassName='container'
      inputClassName='input'
    />
  );
};
```

### Props

| Prop                 | Type                    | Description                                                                     | Default Value  | Observations                   |
| :------------------- | :---------------------- | :------------------------------------------------------------------------------ | :------------- | :----------------------------- |
| `characters`         | Number                  | The number of inputs to display                                                 | 6              |                                |
| `allowedCharacters`  | String                  | Regex for allowed characters                                                    | `^[A-Za-z0-9]` |                                |
| `password`           | Boolean                 | If present changes the type of the input to password, by default is set to text | False          |                                |
| `inputStyle`         | Object                  | The styles to be applied to each input                                          |                | deprecated since version 1.2.0 |
| `containerStyle`     | Object                  | The styles to be applied to the container                                       |                | deprecated since version 1.2.0 |
| `inputClassName`     | String                  | The styles to be applied to each input                                          |                |                                |
| `containerClassName` | String                  | The styles to be applied to the container                                       |                |                                |
| `onChange`           | Function(value: String) | Callback function called every time an input value changes                      |                |                                |

## Changelog

### 1.2.1

- Add missing dist files

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
